import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useSecuritySettingsViewModel } from "@features/dashboard/settings/SecuritySettings/useSecuritySettingsViewModel";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { AlertCircle, LoaderCircle } from "lucide-react";

export default function SecuritySettings() {
  const {
    user,
    changePasswordForm,
    onChangePasswordSubmit,
    changeEmailForm,
    onChangeEmailSubmit,
  } = useSecuritySettingsViewModel();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Update your security settings
        </p>
      </div>
      <Separator />
      <div className="space-y-10">
        {user.data && (
          <>
            {!user.data.providerData.some(
              (p) => p.providerId === "password",
            ) && (
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You are using a third-party provider to sign in. You can add a
                  password to your account below to sign in with an email and
                  password in addition to your third-party provider.
                </AlertDescription>
              </Alert>
            )}
            {user.data.providerData.length > 1 && (
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You have multiple ways of signing in. You can sign in with
                  your email and password or with your third-party provider.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        <Form {...changePasswordForm}>
          <form onSubmit={onChangePasswordSubmit} className="space-y-8">
            <FormField
              control={changePasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm new Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                !changePasswordForm.formState.isDirty ||
                changePasswordForm.formState.isSubmitting
              }
            >
              {changePasswordForm.formState.isSubmitting && (
                <LoaderCircle className="animate-spin mr-2" />
              )}
              Update password
            </Button>
          </form>
        </Form>
        <Form {...changeEmailForm}>
          <form onSubmit={onChangeEmailSubmit} className="space-y-8">
            <FormField
              control={changeEmailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="New Email" {...field} />
                  </FormControl>
                  {!user.data?.emailVerified && (
                    <FormDescription className="flex items-center text-destructive">
                      <AlertCircle className="mr-2" />
                      Your email is not verified
                    </FormDescription>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                !changeEmailForm.formState.isDirty ||
                changeEmailForm.formState.isSubmitting
              }
            >
              {changeEmailForm.formState.isSubmitting && (
                <LoaderCircle className="animate-spin mr-2" />
              )}
              Update email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
