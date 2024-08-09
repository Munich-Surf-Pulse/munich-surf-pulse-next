import React from "react";
import { NextPage } from "next";

const PrivacyPage: NextPage = () => {
  return (
    <div
      className={
        "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      }
    >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Privacy Policy for Munich Surf Pulse
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Project Information
          </h2>
          <p>
            Munich Surf Pulse (referred to as "we", "our", or "us") is committed
            to protecting your privacy. For any questions regarding this privacy
            policy, please contact us at{" "}
            <a href="mailto:g.mahlknecht@gmail.com" className="text-blue-500">
              g.mahlknecht@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Data Collection</h2>
          <p>We collect the following type of data:</p>
          <ul className="list-disc list-inside ml-4">
            <li>
              Anonymous votes: This data consists solely of a number that the
              user can enter.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. Purpose of Data Collection
          </h2>
          <p>
            The data collected is used to create occupancy statistics for
            surfers.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            4. Data Processing and Storage
          </h2>
          <p>
            The data is stored in a database hosted in the EU. It is processed
            only to provide insights into occupancy. There is no planned
            deletion of this data as it is anonymized and not personally
            identifiable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Data Anonymization</h2>
          <p>
            The data collected is entirely anonymized. There is no personal
            relation to the data collected, as it consists solely of a number
            input by the user.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            6. Third-Party Services
          </h2>
          <p>
            We do not use any third-party services that have access to the data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. User Rights</h2>
          <p>
            As the data collected is anonymized and not personally identifiable,
            users do not have rights to access, modify, or delete their data.
            Users can opt out of data collection by choosing not to use the
            application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Cookies</h2>
          <p className={"mb-4"}>
            We only use cookies that are essential for the core functionality of
            our website. These cookies are necessary to provide you with
            services such as language localization, ensuring that our content is
            displayed in the correct language based on your preferences. These
            cookies do not store any personally identifiable information and are
            required for the proper functioning of our website.
          </p>
          <p>
            In compliance with GDPR, these necessary cookies are used without
            requiring your explicit consent, as they are vital for the operation
            of the website. By continuing to use our site, you agree to the use
            of these essential cookies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Data Security</h2>
          <p>
            No specific security measures are outlined here as the data is
            anonymized and non-personally identifiable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            10. Changes to the Privacy Policy
          </h2>
          <p>
            There is no information available regarding changes to this privacy
            policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            11. Legal Basis for Data Processing
          </h2>
          <p>
            No consent is required for the collection and processing of this
            data as it is entirely anonymized and non-personally identifiable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            12. International Data Transfers
          </h2>
          <p>We do not transfer data internationally.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
