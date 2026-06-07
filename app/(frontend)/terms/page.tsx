import React from "react";

export default function TermsPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-24 lg:px-8 lg:py-32">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Terms and Conditions
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                1. Introduction
              </h2>
              <p>
                These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Teapot Publishing
                website and the purchase of any products or services from us. By accessing or using
                our website, you agree to be bound by these Terms. If you do not agree, please do
                not use our website.
              </p>
              <p className="mt-2">
                These Terms are governed by the laws of the Republic of South Africa and are to be
                read in conjunction with the Consumer Protection Act 68 of 2008 (CPA), the
                Electronic Communications and Transactions Act 25 of 2002 (ECTA), and the
                Protection of Personal Information Act 4 of 2013 (POPIA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                2. Definitions
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>&ldquo;Teapot Publishing&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;</strong> refers to Teapot Publishing, a South African publishing business.</li>
                <li><strong>&ldquo;Customer&rdquo;, &ldquo;you&rdquo;, &ldquo;your&rdquo;</strong> refers to any person who accesses or uses our website or purchases products from us.</li>
                <li><strong>&ldquo;Products&rdquo;</strong> refers to books, digital publications, merchandise, and any other goods or services offered on our website.</li>
                <li><strong>&ldquo;Website&rdquo;</strong> refers to the Teapot Publishing website and all associated pages.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                3. Eligibility
              </h2>
              <p>
                By placing an order on our website, you confirm that you are at least 18 years of
                age or have the consent of a parent or guardian. If you are purchasing on behalf of
                a minor, you accept full responsibility for the transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                4. Products and Pricing
              </h2>
              <p>
                All prices are displayed in South African Rand (ZAR) and include Value Added Tax
                (VAT) at the prevailing rate, unless otherwise stated. We reserve the right to
                change prices at any time without prior notice; however, any price changes will not
                affect orders already confirmed.
              </p>
              <p className="mt-2">
                We make every effort to display accurate product descriptions, images, and pricing.
                In the event of an error, we reserve the right to correct the error and cancel or
                amend your order accordingly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                5. Orders and Acceptance
              </h2>
              <p>
                When you place an order, you are making an offer to purchase. Your order is subject
                to acceptance by Teapot Publishing. We will confirm receipt of your order by email;
                however, this does not constitute acceptance. A contract is formed only when we
                dispatch the product and send a dispatch confirmation.
              </p>
              <p className="mt-2">
                We reserve the right to refuse or cancel any order for reasons including but not
                limited to: product unavailability, errors in pricing or description, or suspicion
                of fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                6. Payment
              </h2>
              <p>
                Payment is required at the time of order placement. We accept payment via the
                methods displayed at checkout. All payments are processed securely through our
                third-party payment gateway.
              </p>
              <p className="mt-2">
                You warrant that the payment details provided are accurate and that you are
                authorised to use the selected payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                7. Delivery
              </h2>
              <p>
                Delivery times are estimates and not guaranteed. We are not liable for delays caused
                by circumstances beyond our reasonable control, including but not limited to courier
                delays, customs clearance, or force majeure events.
              </p>
              <p className="mt-2">
                Risk in the Products passes to you upon delivery. Ownership passes upon full payment.
              </p>
              <p className="mt-2">
                For detailed information, please refer to our{" "}
                <a href="/shipping" className="text-primary hover:underline">Shipping Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                8. Returns, Refunds, and Exchanges
              </h2>
              <p>
                We are committed to fair dealing in terms of the CPA. For details on our return,
                refund, and exchange policies, please refer to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><a href="/refunds" className="text-primary hover:underline">Refund Policy</a></li>
                <li><a href="/exchanges" className="text-primary hover:underline">Exchange Policy</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                9. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, images, logos, book covers, and
                designs, is the intellectual property of Teapot Publishing or its licensors and is
                protected by South African copyright law and international treaties. You may not
                reproduce, distribute, or create derivative works without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                10. Limitation of Liability
              </h2>
              <p>
                To the extent permitted by law, Teapot Publishing shall not be liable for any
                indirect, incidental, consequential, or punitive damages arising from your use of
                our website or products. Our total liability for any claim shall not exceed the
                amount paid by you for the specific product giving rise to the claim.
              </p>
              <p className="mt-2">
                Nothing in these Terms limits or excludes our liability as required by the CPA or
                other applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Teapot Publishing, its owners, employees,
                and agents from any claims, losses, damages, liabilities, or expenses arising from
                your use of the website, your violation of these Terms, or your infringement of any
                third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                12. Privacy
              </h2>
              <p>
                Your use of our website is also governed by our Privacy Policy, which explains how
                we collect, use, and protect your personal information in accordance with POPIA.
                Please refer to our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for
                full details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                13. Prohibited Conduct
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Use the website for any unlawful purpose or in violation of any applicable law.</li>
                <li>Attempt to gain unauthorised access to any part of the website or its systems.</li>
                <li>Upload or transmit viruses, malware, or other harmful code.</li>
                <li>Interfere with the proper functioning of the website.</li>
                <li>Scrape, data mine, or use automated tools to extract content without permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                14. Force Majeure
              </h2>
              <p>
                We shall not be liable for any failure or delay in performing our obligations under
                these Terms where such failure results from circumstances beyond our reasonable
                control, including natural disasters, pandemics, strikes, government actions, or
                infrastructure failures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                15. Dispute Resolution
              </h2>
              <p>
                Any dispute arising from these Terms or your use of our website shall first be
                attempted to be resolved through informal negotiation. If unresolved, the dispute
                shall be submitted to mediation in accordance with the rules of the Arbitration
                Foundation of Southern Africa (AFSA).
              </p>
              <p className="mt-2">
                As a consumer, you also have the right to refer a dispute to the{" "}
                <strong>Consumer Goods and Services Ombud (CGSO)</strong> or the{" "}
                <strong>National Consumer Commission (NCC)</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                16. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms are governed by the laws of the Republic of South Africa. Any legal
                proceedings shall be subject to the jurisdiction of the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                17. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the
                remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                18. Changes to These Terms
              </h2>
              <p>
                We reserve the right to amend these Terms at any time. Changes will be effective
                upon posting on this page. Your continued use of the website following any changes
                constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                19. Contact Us
              </h2>
              <p>
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> cathteapot@gmail.com<br />
                <strong>Business:</strong> Teapot Publishing, South Africa
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
