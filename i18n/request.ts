import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();

  let locale = store.get("locale")?.value;

  if (!locale) {
    const header = (await headers()).get("accept-language"); // "hu-HU,hu;q=0.9,en;q=0.8"
    if (header) {
      const preferred = header.split(",")[0].split("-")[0];
      locale = ["hu", "en"].includes(preferred) ? preferred : "en";
    } else {
      locale = "en";
    }
  }

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (e) {
    messages = (await import(`../messages/en.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
