import { auth } from "@config/firebase";
import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
  useAuthSignInWithRedirect,
  useGetRedirectResult,
} from "@hooks/firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebaseError } from "@hooks/utils";
import { signInFormSchema } from "@custom-types/schemas";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useCallback } from "react";
import { useCreateUserData } from "@hooks/api/users";
import { env } from "@utils/other";

const googleProvider = new GoogleAuthProvider();

export const useSignInViewModel = () => {
  //used to navigate to a different page after successful registration
  const navigate = useNavigate();

  //used to retrieve the location state. This is used to redirect the user back to the page they were on before signing in
  const { state: locationState } = useLocation();

  //get a function that will map firebase error messages to a more user friendly message
  const { getFirebaseErrorMessage } = useFirebaseError();

  //hook to create a new user in the firestore database
  const { mutateAsync: createFirestoreUser } = useCreateUserData();

  //hook to sign in using a popup
  const { mutateAsync: SignInWithPopup } = useAuthSignInWithPopup(auth, {
    onSuccess: (UserCredential) => onProviderSignIn(UserCredential),
    onError: (error) => {
      form.setError("root", { message: getFirebaseErrorMessage(error) });
    },
  });

  //register the form and pass in the zod schema
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  //used to navigate to a different page after successful provider registration
  const onProviderSignIn = useCallback(
    async (UserCredential: UserCredential | null | undefined) => {
      if (UserCredential) {
        const additionalUserInfo = getAdditionalUserInfo(UserCredential);
        if (additionalUserInfo?.isNewUser) {
          try {
            await createFirestoreUser(UserCredential.user.uid, {
              registrationComplete: false,
              notifications: {
                communication_emails: false,
                marketing_emails: false,
                security_emails: false,
                social_emails: false,
                type: "all",
              },
            });
            navigate("/register/additional", { replace: true });
          } catch (error: any) {
            form.setError("root", { message: getFirebaseErrorMessage(error) });
          }
        } else {
          navigate(locationState?.from ?? "/", { replace: true });
        }
      }
    },
    [
      createFirestoreUser,
      navigate,
      form,
      getFirebaseErrorMessage,
      locationState?.from,
    ],
  );

  //hook to sign in with a provider and redirect
  const { mutateAsync: SignInWithRedirect } = useAuthSignInWithRedirect(auth);

  //hook to get the redirect result from the firebase auth (if one exists)
  const { data: redirectResultGoogle } = useGetRedirectResult(auth);

  //if there was a successfull redirect result and the user is a new user navigate to the additional info page
  onProviderSignIn(redirectResultGoogle);

  //hook to create a new user with email and password with firebase auth
  const { mutateAsync: signInUserWithEmailAndPassword } =
    useAuthSignInWithEmailAndPassword(auth);

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmit: SubmitHandler<z.infer<typeof signInFormSchema>> = useCallback(
    async (data) => {
      try {
        await signInUserWithEmailAndPassword({
          email: data.email,
          password: data.password,
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
      signInUserWithEmailAndPassword,
      locationState?.from,
    ],
  );

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    googleSignIn: () =>
      env("VITE_FIREBASE_AUTH_GOOGLE_USE_POPUP") === "true"
        ? SignInWithPopup({ provider: googleProvider })
        : SignInWithRedirect({ provider: googleProvider }),
  };
};
