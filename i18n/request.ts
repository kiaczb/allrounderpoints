import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();

  // cookie
  let locale = store.get("locale")?.value;

  // ha nincs cookie, nézd meg a böngésző preferenciát
  if (!locale) {
    const header = (await headers()).get("accept-language"); // pl. "hu-HU,hu;q=0.9,en;q=0.8"
    if (header) {
      const preferred = header.split(",")[0].split("-")[0]; // csak "hu" vagy "en"
      locale = ["hu", "en"].includes(preferred) ? preferred : "en";
    } else {
      locale = "en";
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
