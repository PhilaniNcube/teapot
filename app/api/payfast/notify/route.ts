import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { verifyPayfastITN } from '@/lib/payfast'

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text()
    const params = new URLSearchParams(rawText)
    
    const postData: Record<string, string> = {}
    params.forEach((value, key) => {
      postData[key] = value
    })

    console.log('[Payfast ITN] Received notification payload:', postData)

    // 1. Verify ITN signature and server validation with Payfast
    const verification = await verifyPayfastITN(postData)
    if (!verification.valid) {
      console.error('[Payfast ITN] Validation failed:', verification.reason)
      return new NextResponse(`Invalid ITN payload: ${verification.reason}`, { status: 400 })
    }

    const {
      m_payment_id,
      pf_payment_id,
      payment_status,
      amount_gross,
      amount_fee,
      amount_net,
      signature,
    } = postData

    if (!m_payment_id) {
      console.error('[Payfast ITN] Missing m_payment_id in payload')
      return new NextResponse('Missing order ID (m_payment_id)', { status: 400 })
    }

    const payload = await getPayload({ config })

    // 2. Fetch the corresponding order from Payload
    let order
    try {
      order = await payload.findByID({
        collection: 'orders',
        id: m_payment_id,
      })
    } catch (err) {
      console.error(`[Payfast ITN] Order #${m_payment_id} not found:`, err)
      return new NextResponse(`Order #${m_payment_id} not found`, { status: 404 })
    }

    // 3. Verify total amount matches
    const grossAmount = parseFloat(amount_gross || '0')
    if (Math.abs(order.total - grossAmount) > 0.01) {
      console.error(
        `[Payfast ITN] Amount mismatch for Order #${m_payment_id}. Expected: ${order.total}, Received: ${grossAmount}`
      )
      return new NextResponse('Amount mismatch', { status: 400 })
    }

    // 4. Log transaction record in Payload Transactions collection
    await payload.create({
      collection: 'transactions',
      data: {
        order: order.id,
        pfPaymentId: pf_payment_id || '',
        paymentStatus: payment_status || 'UNKNOWN',
        amountGross: grossAmount,
        amountFee: parseFloat(amount_fee || '0'),
        amountNet: parseFloat(amount_net || '0'),
        signature: signature || '',
        rawPayload: postData,
      },
    })

    // 5. Update Order status based on Payfast payment status
    if (payment_status === 'COMPLETE') {
      console.log(`[Payfast ITN] Payment COMPLETE for Order #${order.id}`)
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          paymentStatus: 'paid',
          status: 'pending', // Order pending fulfillment
          payfastPaymentId: pf_payment_id || '',
          paidAt: new Date().toISOString(),
        },
      })
    } else if (payment_status === 'CANCELLED') {
      console.log(`[Payfast ITN] Payment CANCELLED for Order #${order.id}`)
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          paymentStatus: 'cancelled',
        },
      })
    } else if (payment_status === 'FAILED') {
      console.log(`[Payfast ITN] Payment FAILED for Order #${order.id}`)
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          paymentStatus: 'failed',
        },
      })
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('[Payfast ITN] Server error handling notification:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
