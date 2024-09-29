import { auth } from "@config/firebase";
import {
  changeEmailFormSchema,
  resetPasswordFormSchema,
} from "@custom-types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAuthUpdateEmail,
  useAuthUpdatePassword,
  useAuthUser,
} from "@hooks/firebase/auth";
import { useToast } from "@hooks/use-toast";
import { useFirebaseError } from "@hooks/utils";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useSecuritySettingsViewModel = () => {
  const user = useAuthUser(auth);

  const changePasswordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { confirmPassword: "", password: "" },
  });

  const changeEmailForm = useForm<z.infer<typeof changeEmailFormSchema>>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: { email: "" },
  });

  const { getFirebaseErrorMessage } = useFirebaseError();

  const { toast } = useToast();

  const { mutateAsync: updateUserPassword } = useAuthUpdatePassword();

  const { mutateAsync: updateUserEmail } = useAuthUpdateEmail();

  const onChangePasswordSubmit: SubmitHandler<
    z.infer<typeof resetPasswordFormSchema>
  > = useCallback(
    async (data) => {
      if (!user.data) return;
      try {
        await updateUserPassword({
          user: user.data,
          newPassword: data.password,
        });
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully",
        });
        changePasswordForm.reset();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was an error updating your password",
        });
        changePasswordForm.setError("root", {
          message: getFirebaseErrorMessage(error),
        });
      }
    },
    [
      user,
      updateUserPassword,
      changePasswordForm,
      toast,
      getFirebaseErrorMessage,
    ],
  );

  const onChangeEmailSubmit: SubmitHandler<
    z.infer<typeof changeEmailFormSchema>
  > = useCallback(
    async (data) => {
      if (!user.data) return;
      try {
        await updateUserEmail({
          user: user.data,
          newEmail: data.email,
        });
        toast({
          title: "Email updated",
          description: "Your email has been successfully updated",
        });
        changeEmailForm.reset();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was an error updating your email",
        });
        changeEmailForm.setError("root", {
          message: getFirebaseErrorMessage(error),
        });
      }
    },
    [changeEmailForm, getFirebaseErrorMessage, toast, updateUserEmail, user],
  );

  return {
    user,
    changePasswordForm,
    onChangePasswordSubmit: changePasswordForm.handleSubmit(
      onChangePasswordSubmit,
    ),
    changeEmailForm,
    onChangeEmailSubmit: changeEmailForm.handleSubmit(onChangeEmailSubmit),
  };
};
