import React from "react";

export default function ShippingPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-24 lg:px-8 lg:py-32">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Shipping Policy
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
                Teapot Publishing delivers books and other products to customers across South
                Africa and, where available, to select international destinations. This Shipping
                Policy outlines our delivery procedures, timeframes, and costs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                2. Processing Time
              </h2>
              <p>
                Orders are typically processed and dispatched within{" "}
                <strong>2 to 5 (two to five) business days</strong> from the date of order
                confirmation. During peak periods (e.g., holidays, book launches), processing may
                take slightly longer. You will be notified by email if there is a significant delay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                3. Delivery Areas
              </h2>
              <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700">
                3.1 South Africa
              </h3>
              <p>
                We deliver to all major centres and most rural areas within the Republic of South
                Africa. Delivery times vary depending on your location:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Major metropolitan areas</strong> (Johannesburg, Cape Town, Durban, Pretoria): 2 to 5 business days.</li>
                <li><strong>Regional towns and smaller centres:</strong> 5 to 10 business days.</li>
                <li><strong>Rural and remote areas:</strong> 7 to 14 business days.</li>
              </ul>
              <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700">
                3.2 International
              </h3>
              <p>
                International shipping is available to select countries. Delivery times and costs
                will be calculated at checkout. Please note that international orders may be subject
                to customs duties, import taxes, or other charges levied by the destination country.
                These charges are the responsibility of the customer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                4. Shipping Costs
              </h2>
              <p>
                Shipping costs are calculated at checkout based on the delivery destination, the
                weight of the order, and the shipping method selected. Where applicable, we may
                offer free shipping on orders above a specified value; this will be advertised on
                the website.
              </p>
              <p className="mt-2">
                All shipping costs are displayed in South African Rand (ZAR) and are payable at the
                time of order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                5. Courier Services
              </h2>
              <p>
                We use reputable courier partners to ensure safe and timely delivery. The specific
                courier used will depend on your location and the nature of your order. You will
                receive a tracking number (where available) once your order has been dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                6. Delivery Confirmation
              </h2>
              <p>
                You will receive an email notification with tracking information once your order has
                been dispatched. Please monitor the tracking link for updates on your delivery
                status.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                7. Failed Delivery Attempts
              </h2>
              <p>
                If a delivery attempt is unsuccessful (e.g., no one available to receive the
                package), the courier will typically leave a notice and attempt redelivery. If the
                package cannot be delivered after multiple attempts, it may be returned to us. In
                such cases, we will contact you to arrange redelivery, and additional shipping
                charges may apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                8. Damaged or Lost Parcels
              </h2>
              <p>
                If your order arrives damaged, please contact us immediately at{" "}
                <strong>cathteapot@gmail.com</strong> with photographs of the damage. We will
                arrange a replacement or refund in accordance with our{" "}
                <a href="/refunds" className="text-primary hover:underline">Refund Policy</a>.
              </p>
              <p className="mt-2">
                In the event that a parcel is lost in transit, we will investigate with the courier
                and, if confirmed lost, arrange a replacement or refund at no additional cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                9. P.O. Boxes and Parcel Lockers
              </h2>
              <p>
                We can deliver to P.O. Boxes and parcel lockers where the selected courier service
                supports it. Please ensure the address provided is accurate and complete.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                10. Customs and Import Duties (International Orders)
              </h2>
              <p>
                For orders shipped outside of South Africa, the customer is responsible for any
                customs duties, import taxes, tariffs, or other fees imposed by the destination
                country. These charges are not included in our shipping costs and are beyond our
                control. We recommend contacting your local customs office for more information
                before placing an international order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                11. Delays
              </h2>
              <p>
                While we strive to deliver within the estimated timeframes, delays may occur due to
                factors beyond our control, including severe weather, public holidays, courier
                disruptions, or customs clearance. We are not liable for delays caused by such
                events.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                12. Changes to This Policy
              </h2>
              <p>
                Teapot Publishing reserves the right to update this Shipping Policy at any time.
                Changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                13. Contact Us
              </h2>
              <p>
                For any questions regarding shipping, please contact us at:
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
