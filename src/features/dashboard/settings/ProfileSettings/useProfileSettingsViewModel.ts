import { auth } from "@config/firebase";
import { accountFormSchema } from "@custom-types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserData, useUpdateUserData } from "@hooks/api/users";
import { useAuthUser } from "@hooks/firebase/auth";
import { useToast } from "@hooks/use-toast";
import { useFirebaseError } from "@hooks/utils";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const date = new Date();
export const useAccountSettingsViewModel = () => {
  const user = useAuthUser(auth);

  const userData = useGetUserData(user.data);

  const { mutateAsync: updateUserData } = useUpdateUserData();

  const { getFirebaseErrorMessage } = useFirebaseError();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: { username: userData.data?.username, dob: date },
  });

  const onSubmit: SubmitHandler<z.infer<typeof accountFormSchema>> =
    useCallback(
      async (data) => {
        try {
          if (!user.data) return;
          await updateUserData(user.data.uid, data);
          toast({
            title: "Account updated",
            description: "Your account has been updated successfully",
          });
          form.reset(data, { keepValues: true });
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "There was an error updating your account",
          });
          form.setError("root", { message: getFirebaseErrorMessage(error) });
        }
      },
      [form, getFirebaseErrorMessage, toast, updateUserData, user.data],
    );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
