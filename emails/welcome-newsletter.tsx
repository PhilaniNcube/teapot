import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export type WelcomeNewsletterEmailProps = {
  email?: string
}

export default function WelcomeNewsletterEmail({
  email = 'reader@example.com',
}: WelcomeNewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Barbara&apos;s Readers&apos; Circle</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={heroSection}>
            <Text style={brand}>Teapot Publishing</Text>
            <Text style={pill}>Readers&apos; Circle</Text>
            <Heading style={headingStyle}>Welcome to Barbara&apos;s Readers&apos; Circle</Heading>
            <Text style={introStyle}>
              Thank you for subscribing! We&apos;re delighted to have you join our community of readers.
            </Text>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>What you can expect to receive:</Text>
            <Text style={bulletPoint}>✓ News about upcoming books and launches</Text>
            <Text style={bulletPoint}>✓ Behind-the-scenes stories from Barbara&apos;s writing life</Text>
            <Text style={bulletPoint}>✓ Historical discoveries that inspire her novels</Text>
            <Text style={bulletPoint}>✓ Personal reflections and memoir-writing insights</Text>
            <Text style={bulletPoint}>✓ Exclusive updates before they&apos;re shared elsewhere</Text>
          </Section>

          <Section style={panel}>
            <Text style={bodyText}>
              Barbara Townsend is a writer devoted to uncovering and giving voice to overlooked stories. Through this newsletter, she shares the smaller, untold histories that intrigue her and shouldn&apos;t be forgotten.
            </Text>
            <Text style={bodyText}>
              If you have any questions, feel free to reply directly to this email!
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={footerStyle}>
            You received this email because you subscribed to Barbara&apos;s Readers&apos; Circle.
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
  fontSize: '28px',
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

const bulletPoint = {
  color: '#2f241a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 8px',
}

const bodyText = {
  color: '#2f241a',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 12px',
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
