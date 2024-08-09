import CookieConsent from "@/components/common/CookieConsent";
import { getI18n } from "@/locales/server";

const CookieConsentProvider = async () => {
  const t = await getI18n();

  return (
    <CookieConsent
      locales={{
        accept: t("cookie-consent.accept"),
        learnMore: t("cookie-consent.learn-more"),
        message: t("cookie-consent.message"),
      }}
    />
  );
};

export default CookieConsentProvider;
