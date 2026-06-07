import React from "react";

export default function ExchangesPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-24 lg:px-8 lg:py-32">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Exchange Policy
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                1. Overview
              </h2>
              <p>
                In terms of the Consumer Protection Act 68 of 2008 (CPA), Teapot Publishing offers
                an exchange policy to ensure that you receive products that meet your expectations.
                This Exchange Policy outlines the circumstances and process for exchanging items
                purchased through our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                2. Eligibility for Exchanges
              </h2>
              <p>
                You may request an exchange within <strong>30 (thirty) calendar days</strong> of
                receiving your order if:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>The product received is defective, damaged, or not as described.</li>
                <li>You received the wrong item, edition, or format.</li>
                <li>The product does not match the specification agreed upon at the time of purchase.</li>
              </ul>
              <p className="mt-4">
                In accordance with Section 56 of the CPA, you are entitled to exchange goods within
                six months of delivery if the goods are defective or not of a quality that a person
                would reasonably expect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                3. Non-Exchangeable Items
              </h2>
              <p>The following items are generally not eligible for exchange unless defective:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Books that have been read, marked, or show signs of wear beyond normal inspection.</li>
                <li>Digital products (e-books, audiobooks) once downloaded or accessed, unless defective.</li>
                <li>Custom or personalised orders, unless the product does not match the agreed specification.</li>
                <li>Items purchased on final sale or at a promotional discount where clearly stated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                4. How to Request an Exchange
              </h2>
              <p>To request an exchange, please contact us at <strong>cathteapot@gmail.com</strong> with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your full name and order number.</li>
                <li>A description of the issue and the reason for the exchange request.</li>
                <li>The preferred replacement item (where applicable).</li>
                <li>Photographic evidence of any damage or defect (where applicable).</li>
              </ul>
              <p className="mt-4">
                We will acknowledge your request within <strong>5 (five) business days</strong> and
                provide instructions for returning the original item and receiving the replacement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                5. Return of Original Item
              </h2>
              <p>
                Where an exchange is approved, we will provide you with instructions for returning
                the original item. The item must be returned in its original condition and packaging
                where reasonably possible.
              </p>
              <p className="mt-2">
                Return shipping costs will be borne by Teapot Publishing if the exchange is due to
                our error (wrong item, defective product). If the exchange is requested for other
                reasons covered under this policy, the customer may be responsible for the cost of
                returning the original item.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                6. Replacement Dispatch
              </h2>
              <p>
                Once we receive the returned item and confirm the exchange, we will dispatch the
                replacement product. Where the replacement item is of equal or lesser value, no
                additional payment is required. If the replacement is of greater value, you will be
                invoiced for the difference.
              </p>
              <p className="mt-2">
                If the requested replacement is unavailable, we will notify you and offer an
                alternative, such as a different edition, store credit, or a refund in terms of our{" "}
                <a href="/refunds" className="text-primary hover:underline">Refund Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                7. Exchanges for Change of Mind
              </h2>
              <p>
                We do not generally offer exchanges for a change of mind on physical books, as the
                CPA does not require this. However, we may consider such requests on a
                case-by-case basis at our discretion. If accepted, the customer will be responsible
                for all return and re-shipping costs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                8. Timeframe
              </h2>
              <p>
                Exchanges are typically processed within <strong>10 (ten) business days</strong>{" "}
                from the date we receive the returned item. You will be notified by email once the
                replacement has been dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                9. Disputes
              </h2>
              <p>
                If you are not satisfied with the outcome of your exchange request, you have the
                right to lodge a complaint with the{" "}
                <strong>National Consumer Commission (NCC)</strong> or the{" "}
                <strong>Consumer Goods and Services Ombud of South Africa (CGSO)</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                10. Changes to This Policy
              </h2>
              <p>
                Teapot Publishing reserves the right to update this Exchange Policy at any time.
                Changes will be posted on this page with an updated revision date. We encourage you
                to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                11. Contact Us
              </h2>
              <p>
                For any questions regarding this Exchange Policy, please contact us at:
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
