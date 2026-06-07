import React from "react";

export default function RefundsPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-24 lg:px-8 lg:py-32">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Refund Policy
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-sm text-muted-foreground">
              Last updated: 07 June 2026
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                1. Overview
              </h2>
              <p>
                In accordance with the Consumer Protection Act 68 of 2008 (CPA) of South Africa,
                Teapot Publishing is committed to ensuring that you are satisfied with your purchase.
                This Refund Policy outlines the circumstances under which you may request a refund
                for books, digital products, or other goods purchased through our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                2. Eligibility for Refunds
              </h2>
              <p>You may request a refund within <strong>30 (thirty) calendar days</strong> of receiving your order if:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>The product received is damaged, defective, or not as described.</li>
                <li>You received the wrong item or an incorrect edition.</li>
                <li>The product arrives more than 30 days after the estimated delivery date.</li>
                <li>You have exercised your right to cancel a direct agreement within the cooling-off period as provided for in Section 16 of the CPA.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                3. Non-Refundable Items
              </h2>
              <p>The following items are generally not eligible for a refund unless defective:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Books that have been read, marked, or show signs of wear beyond normal inspection.</li>
                <li>Digital products (e-books, audiobooks) once downloaded or accessed, unless defective.</li>
                <li>Custom or personalised orders, unless the product does not match the agreed specification.</li>
                <li>Items purchased on final sale or at a promotional discount where clearly stated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                4. How to Request a Refund
              </h2>
              <p>To request a refund, please contact us at <strong>cathteapot@gmail.com</strong> with the following information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your full name and order number.</li>
                <li>A description of the issue and the reason for the refund request.</li>
                <li>Photographic evidence of any damage or defect (where applicable).</li>
              </ul>
              <p className="mt-4">
                We will acknowledge your request within <strong>5 (five) business days</strong> and
                endeavour to process approved refunds within <strong>10 (ten) business days</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                5. Refund Method
              </h2>
              <p>
                Approved refunds will be processed back to the original method of payment.
                Please allow up to 10 business days for the refund to reflect in your account,
                depending on your bank or payment provider.
              </p>
              <p className="mt-2">
                Where the original payment method is unavailable, we will arrange an alternative
                method of reimbursement in consultation with you, which may include store credit
                or an electronic funds transfer (EFT).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                6. Return of Goods
              </h2>
              <p>
                Where a refund is granted for a physical product, we may request that you return
                the item to us. Return shipping costs will be borne by Teapot Publishing if the
                return is due to our error (wrong item, defective product). If the return is for
                other reasons covered under this policy, the customer may be responsible for return
                shipping costs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                7. Disputes
              </h2>
              <p>
                If you are not satisfied with the outcome of your refund request, you have the right
                to lodge a complaint with the <strong>National Consumer Commission (NCC)</strong> or
                the relevant <strong>Consumer Goods and Services Ombud of South Africa (CGSO)</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                8. Changes to This Policy
              </h2>
              <p>
                Teapot Publishing reserves the right to update this Refund Policy at any time.
                Changes will be posted on this page with an updated revision date. We encourage
                you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                9. Contact Us
              </h2>
              <p>
                For any questions regarding this Refund Policy, please contact us at:
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
