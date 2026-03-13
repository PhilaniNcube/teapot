import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export type ContactFormSubmission = {
  firstName: string
  lastName: string
  email: string
  // subject: string
  message: string
}

export type ContactFormSubmissionEmailProps = {
  submission?: ContactFormSubmission
}

export const sampleContactFormSubmission: ContactFormSubmission = {
  firstName: 'Barbara',
  lastName: 'Townsend',
  email: 'reader@example.com',
  // subject: 'Book order enquiry',
  message:
    'Hello,\n\nI would like to learn more about upcoming book signings and speaking events.\n\nThank you.',
}

function formatSenderName(submission: ContactFormSubmission) {
  return `${submission.firstName} ${submission.lastName}`.trim()
}

export default function ContactFormSubmissionEmail({
  submission = sampleContactFormSubmission,
}: ContactFormSubmissionEmailProps) {
  const senderName = formatSenderName(submission)
  const messageLines = submission.message
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {senderName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={heroSection}>
            <Text style={brand}>Teapot Publishing</Text>
            <Text style={pill}>Contact form enquiry</Text>
            <Heading style={headingStyle}>Book Order Inquiry</Heading>
            <Text style={introStyle}>
              {senderName} sent a new message from the website contact form.
            </Text>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>Sender</Text>
            <Text style={detailLine}>{senderName}</Text>
            <Text style={detailLine}>
              <Link href={`mailto:${submission.email}`} style={linkStyle}>
                {submission.email}
              </Link>
            </Text>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>Message</Text>
            {messageLines.length > 0 ? (
              messageLines.map((line, index) => (
                <Text key={`${line}-${index}`} style={messageLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={messageLine}>{submission.message}</Text>
            )}
          </Section>

          <Hr style={divider} />

          <Text style={footerStyle}>
            Reply directly to this email to continue the conversation with {senderName}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f4efe7',
  color: '#2f241a',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '32px 16px',
}

const container = {
  margin: '0 auto',
  maxWidth: '600px',
}

const heroSection = {
  backgroundColor: '#2f241a',
  borderRadius: '20px',
  marginBottom: '20px',
  padding: '32px',
}

const brand = {
  color: '#f7d48f',
  fontSize: '13px',
  fontWeight: '700',
  letterSpacing: '1.2px',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
}

const pill = {
  backgroundColor: '#f7d48f',
  borderRadius: '999px',
  color: '#2f241a',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: '700',
  margin: '0 0 18px',
  padding: '6px 12px',
}

const headingStyle = {
  color: '#fff8ef',
  fontSize: '30px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '0 0 12px',
}

const introStyle = {
  color: '#f4ddc1',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: 0,
}

const panel = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ddd2',
  borderRadius: '18px',
  marginBottom: '16px',
  padding: '24px',
}

const sectionLabel = {
  color: '#7b5a36',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1.1px',
  margin: '0 0 14px',
  textTransform: 'uppercase' as const,
}

const detailLine = {
  color: '#2f241a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 8px',
}

const messageLine = {
  color: '#2f241a',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 12px',
}

const linkStyle = {
  color: '#7b5a36',
  textDecoration: 'underline',
}

const divider = {
  borderColor: '#e6ddd2',
  margin: '8px 0 16px',
}

const footerStyle = {
  color: '#5f5145',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: 0,
}