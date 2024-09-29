import { auth } from "@config/firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebaseError } from "@hooks/utils";
import { additionalRegistrationInfoSchema } from "@custom-types/schemas";
import { useAuthUser } from "@hooks/firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateUserData } from "@hooks/api/users";
import { useCallback } from "react";

export const useAdditionalRegistrationInfoViewModel = () => {
  //since third party sign ons use a different flow, we need to explicitly redirect and get additional information

  //used to navigate to a different page after successful registration
  const navigate = useNavigate();

  //used to retrieve the location state. This is used to redirect the user back to the page they were on before signing in
  const { state: locationState } = useLocation();

  const user = useAuthUser(auth);

  //hook to create a new user in the firestore database
  const { mutateAsync: updateFirestoreUser } = useUpdateUserData();

  //get a function that will map firebase error messages to a more user friendly message
  const { getFirebaseErrorMessage } = useFirebaseError();

  //register the form and pass in the zod schema
  const form = useForm<z.infer<typeof additionalRegistrationInfoSchema>>({
    resolver: zodResolver(additionalRegistrationInfoSchema),
    defaultValues: { username: "" },
  });

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmit: SubmitHandler<
    z.infer<typeof additionalRegistrationInfoSchema>
  > = useCallback(
    async (data) => {
      if (!user.data) return;
      try {
        await updateFirestoreUser(user.data.uid, {
          username: data.username,
          registrationComplete: true,
        });
        navigate(locationState?.from ?? "/", { replace: true });
      } catch (error: any) {
        form.setError("root", { message: getFirebaseErrorMessage(error) });
      }
    },
    [
      form,
      getFirebaseErrorMessage,
      navigate,
      updateFirestoreUser,
      user.data,
      locationState?.from,
    ],
  );

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
