import { auth } from "@config/firebase";
import { notificationsFormSchema } from "@custom-types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserData, useUpdateUserData } from "@hooks/api/users";
import { useAuthUser } from "@hooks/firebase/auth";
import { useToast } from "@hooks/use-toast";
import { useFirebaseError } from "@hooks/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useNotificationSettingsViewModel = () => {
  const user = useAuthUser(auth);

  const userData = useGetUserData(user.data);

  const { getFirebaseErrorMessage } = useFirebaseError();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      type: userData.data?.notifications?.type || "all",
      communication_emails:
        userData?.data?.notifications?.communication_emails || false,
      marketing_emails:
        userData?.data?.notifications?.marketing_emails || false,
      social_emails: userData?.data?.notifications?.social_emails || false,
      security_emails: true,
    },
  });

  const { mutateAsync: updateUserData } = useUpdateUserData();

  const onSubmit: SubmitHandler<
    z.infer<typeof notificationsFormSchema>
  > = async (data) => {
    if (!user.data) return;
    try {
      await updateUserData(user.data.uid, { notifications: data });
      toast({
        title: "Account updated",
        description: "Your account has been updated successfully",
      });
      form.reset(data, { keepValues: true });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error updating your account",
      });
      form.setError("root", { message: getFirebaseErrorMessage(error) });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
