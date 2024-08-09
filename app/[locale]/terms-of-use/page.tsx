import React from "react";
import { NextPage } from "next";

const TermsOfUsePage: NextPage = () => {
  return (
    <div
      className={
        "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      }
    >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Terms of Use for Munich Surf Pulse
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using Munich Surf Pulse (referred to as "the app",
            "we", "our", or "us"), you agree to comply with and be bound by the
            following terms and conditions. If you do not agree with any part of
            these terms, you must not use the app.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Use of the App</h2>
          <p>
            You agree to use the app for lawful purposes only. You must not use
            the app in any way that causes, or may cause, damage to the app or
            impairment of the availability or accessibility of the app.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
          <p>
            No user accounts are required to use the app. All data collected is
            anonymized and not personally identifiable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Collection</h2>
          <p>
            The app collects anonymous votes to create occupancy statistics for
            surfers. No personal data is collected or stored.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            5. Intellectual Property
          </h2>
          <p>
            All content and materials available on the app, including but not
            limited to text, graphics, website name, code, images, and logos,
            are the intellectual property of Munich Surf Pulse and are protected
            by applicable copyright and trademark law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Munich Surf Pulse will not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising out of your
            use of the app. We make no warranties or representations about the
            accuracy or completeness of the content provided through the app.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on the app. Your continued use
            of the app after any changes to these terms constitutes your
            acceptance of the new terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
          <p>
            These terms will be governed by and construed in accordance with the
            laws of the jurisdiction in which Munich Surf Pulse operates,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            9. Contact Information
          </h2>
          <p>
            If you have any questions about these terms, please contact us at{" "}
            <a href="mailto:g.mahlknecht@gmail.com" className="text-blue-500">
              g.mahlknecht@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
