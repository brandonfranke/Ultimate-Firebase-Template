import { auth } from "@config/firebase";
import { resetPasswordFormSchema } from "@custom-types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthConfirmPasswordReset } from "@hooks/firebase/auth";
import { useFirebaseError } from "@hooks/utils";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

export const useResetPasswordViewModel = () => {
  //used to get the reset password code from search params
  const [searchParams] = useSearchParams();

  //used to navigate to a different page after successful password change
  const navigate = useNavigate();

  //get a function that will map firebase error messages to a more user friendly message
  const { getFirebaseErrorMessage } = useFirebaseError();

  //hook to confirm password reset
  const { mutateAsync: confirmPasswordReset } =
    useAuthConfirmPasswordReset(auth);

  //register the change password form
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
    disabled: searchParams.get("code") === null,
  });

  //create a submit handler for the change password form using the aysnc function from the firebase auth hook
  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordFormSchema>> =
    useCallback(
      async (data) => {
        try {
          await confirmPasswordReset({
            oobCode: "test",
            newPassword: data.password,
          });
          () => navigate("/");
        } catch (error: any) {
          form.setError("root", {
            message: getFirebaseErrorMessage(error),
          });
        }
      },
      [form, getFirebaseErrorMessage, confirmPasswordReset, navigate],
    );

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
