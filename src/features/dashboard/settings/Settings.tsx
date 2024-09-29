import { Button } from "@components/ui/button";
import { PROFILE_SECTIONS } from "@constants/index";
import AccountSettings from "@features/dashboard/settings/ProfileSettings/ProfileSettings";
import NotificationSettings from "@features/dashboard/settings/NotificationSettings/NotificationSettings";
import SecuritySettings from "@features/dashboard/settings/SecuritySettings/SecuritySettings";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@utils/other";
import { useState } from "react";

export default function Settings() {
  const [selectedSection, setSelectedSection] =
    useState<(typeof PROFILE_SECTIONS)[number]["value"]>("account");

  return (
    <div>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {PROFILE_SECTIONS.map((section) => (
                <Button
                  key={section.value}
                  variant={"ghost"}
                  onClick={() => setSelectedSection(section.value)}
                  className={cn(
                    selectedSection === section.value
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "hover:underline",
                    "justify-start",
                  )}
                >
                  {section.text}
                </Button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {selectedSection === "account" && <AccountSettings />}
            {selectedSection === "notifications" && <NotificationSettings />}
            {selectedSection === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}
