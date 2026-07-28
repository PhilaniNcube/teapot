import crypto from 'crypto'

export interface PayfastConfig {
  merchantId: string
  merchantKey: string
  passphrase?: string
  isSandbox: boolean
}

export function getPayfastConfig(): PayfastConfig {
  const isSandbox = process.env.PAYFAST_SANDBOX !== 'false'
  
  return {
    merchantId: process.env.PAYFAST_MERCHANT_ID || (isSandbox ? '10000100' : ''),
    merchantKey: process.env.PAYFAST_MERCHANT_KEY || (isSandbox ? '46f0cd694581a' : ''),
    passphrase: process.env.PAYFAST_PASSPHRASE || '',
    isSandbox,
  }
}

export function getPayfastHost(isSandbox?: boolean): string {
  const sandbox = isSandbox ?? (process.env.PAYFAST_SANDBOX !== 'false')
  return sandbox ? 'sandbox.payfast.co.za' : 'www.payfast.co.za'
}

export function getPayfastProcessUrl(isSandbox?: boolean): string {
  return `https://${getPayfastHost(isSandbox)}/eng/process`
}

export function getPayfastValidateUrl(isSandbox?: boolean): string {
  return `https://${getPayfastHost(isSandbox)}/eng/query/validate`
}

/**
 * Clean & URL-encode string values for Payfast signature calculations.
 * Payfast requires spaces to be converted to '+' instead of '%20'.
 */
function payfastUrlEncode(str: string): string {
  return encodeURIComponent(str.trim()).replace(/%20/g, '+')
}

/**
 * Generate MD5 Signature for Payfast payload data.
 */
export function generatePayfastSignature(
  data: Record<string, string | number | undefined | null>,
  passphrase?: string
): string {
  let getString = ''

  // Build key=value string for non-empty fields (excluding signature)
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (key !== 'signature' && data[key] !== undefined && data[key] !== null && data[key] !== '') {
        const val = String(data[key])
        getString += `${key}=${payfastUrlEncode(val)}&`
      }
    }
  }

  // Remove trailing &
  getString = getString.substring(0, getString.length - 1)

  // Append passphrase if present
  if (passphrase && passphrase.trim() !== '') {
    getString += `&passphrase=${payfastUrlEncode(passphrase.trim())}`
  }

  return crypto.createHash('md5').update(getString).digest('hex')
}

export interface PayfastCheckoutData {
  orderId: string
  amount: number
  itemName: string
  firstName: string
  lastName: string
  email: string
  baseUrl: string
}

export function buildPayfastFormData(data: PayfastCheckoutData) {
  const config = getPayfastConfig()
  
  // Format URLs
  const returnUrl = `${data.baseUrl}/checkout/success?orderId=${data.orderId}`
  const cancelUrl = `${data.baseUrl}/checkout/cancel?orderId=${data.orderId}`
  const notifyUrl = `${data.baseUrl}/api/payfast/notify`

  // Base Payfast payload fields in standard Payfast sequence
  const payload: Record<string, string> = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: data.firstName,
    name_last: data.lastName,
    email_address: data.email,
    m_payment_id: data.orderId,
    amount: data.amount.toFixed(2),
    item_name: data.itemName,
  }

  // Calculate signature
  const signature = generatePayfastSignature(payload, config.passphrase)
  payload.signature = signature

  return {
    actionUrl: getPayfastProcessUrl(config.isSandbox),
    fields: payload,
  }
}

/**
 * Verify ITN payload received from Payfast.
 * Validates MD5 signature and performs server-to-server validation query back to Payfast.
 */
export async function verifyPayfastITN(
  postData: Record<string, string>
): Promise<{ valid: boolean; reason?: string }> {
  const config = getPayfastConfig()

  // 1. Verify MD5 Signature
  const receivedSignature = postData.signature
  if (!receivedSignature) {
    return { valid: false, reason: 'Missing signature in ITN POST body' }
  }

  const calculatedSignature = generatePayfastSignature(postData, config.passphrase)
  if (receivedSignature.toLowerCase() !== calculatedSignature.toLowerCase()) {
    return {
      valid: false,
      reason: `Signature mismatch. Received: ${receivedSignature}, Calculated: ${calculatedSignature}`,
    }
  }

  // 2. Perform Server-to-Server validation check back to Payfast
  try {
    // Construct exact param string in order received (excluding signature)
    let paramString = ''
    for (const key in postData) {
      if (Object.prototype.hasOwnProperty.call(postData, key) && key !== 'signature') {
        paramString += `${key}=${payfastUrlEncode(postData[key])}&`
      }
    }
    paramString = paramString.substring(0, paramString.length - 1)

    const validateUrl = getPayfastValidateUrl(config.isSandbox)
    const response = await fetch(validateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: paramString,
    })

    const resultText = (await response.text()).trim()

    if (resultText !== 'VALID') {
      return {
        valid: false,
        reason: `Payfast validation server returned: ${resultText}`,
      }
    }

    return { valid: true }
  } catch (error) {
    console.error('Error contacting Payfast validation server:', error)
    return { valid: false, reason: `Validation request failed: ${(error as Error).message}` }
  }
}
