"use client";

import { useState, useEffect, FC } from "react";

interface CookieConsentProps {
  locales: {
    message: string;
    learnMore: string;
    accept: string;
  };
}

const CookieConsent: FC<CookieConsentProps> = ({ locales }) => {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    setIsConsentGiven(consent === "true");
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsConsentGiven(true);
  };

  if (isConsentGiven) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4">
      <div
        className={
          "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        }
      >
        {" "}
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">
            {locales.message}
            <a href="/privacy" className="underline ml-2">
              {locales.learnMore}
            </a>
          </p>
          <button
            onClick={handleAccept}
            className="bg-white text-black px-4 py-2 rounded-md"
          >
            {locales.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
