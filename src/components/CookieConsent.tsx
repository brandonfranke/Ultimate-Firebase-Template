import { Button } from "@components/ui/button";
import { useLocalStorageState } from "ahooks";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] =
    useLocalStorageState<boolean>("cookieConsent");

  if (cookieConsent) {
    return null;
  }
  return (
    <div>
      <div className="bg-background items-center fixed bottom-0 left-0 right-0 p-4 sm:w-1/4">
        <h1 className="font-semibold flex mb-2">
          <Cookie className="mr-2" />
          We use cookies
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-center">
            We use cookies to ensure you get the best experience on our website.
            By using our website, you agree to the use of cookies.
          </p>
          <Button onClick={() => setCookieConsent(true)}>Got it</Button>
        </div>
      </div>
    </div>
  );
}
