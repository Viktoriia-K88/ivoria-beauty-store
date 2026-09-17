import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { z } from "zod";

import Container from "../../components/Container/Container";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),

  password: z.string().min(1, "Password is required."),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginLocationState = {
  from?: string;
};

function getFirebaseErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Unable to sign in. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
      return "Email or password is incorrect.";

    case "auth/invalid-email":
      return "Enter a valid email address.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Check your internet connection and try again.";

    default:
      return "Unable to sign in. Please try again.";
  }
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthLoading } = useAuth();

  const [authError, setAuthError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const locationState = location.state as LoginLocationState | null;

  const redirectPath = locationState?.from || "/account";

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setAuthError("");
      setResetMessage("");
      setResetError("");

      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      setAuthError(getFirebaseErrorMessage(error));
    }
  }

  async function handleForgotPassword() {
    const isEmailValid = await trigger("email");

    if (!isEmailValid) {
      return;
    }

    const email = getValues("email").trim();

    try {
      setIsResettingPassword(true);
      setResetMessage("");
      setResetError("");
      setAuthError("");

      await sendPasswordResetEmail(auth, email);

      setResetMessage(
        "If an account exists for this email, password reset instructions have been sent.",
      );
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/network-request-failed"
      ) {
        setResetError("Check your internet connection and try again.");
      } else {
        setResetError(
          "Unable to send password reset instructions. Please try again.",
        );
      }
    } finally {
      setIsResettingPassword(false);
    }
  }

  if (isAuthLoading) {
    return null;
  }

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  const inputClassName =
    "h-12 w-full border border-border bg-surface px-4 text-[13px] outline-none transition-colors placeholder:text-text-secondary/55 focus:border-text-primary focus-visible:ring-1 focus-visible:ring-text-primary";

  const labelClassName =
    "mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary";

  const errorClassName = "mt-1.5 text-[11px] text-accent";

  return (
    <main className="bg-[#f7f5f1]">
      <Container>
        <section className="flex min-h-[calc(100vh-72px)] items-center justify-center py-10 sm:py-14 md:py-16 min-[900px]:min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-[520px] border border-border bg-surface p-6 sm:p-8 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="font-display text-[34px] leading-none font-medium sm:text-[40px] md:text-[46px]">
                Sign in
              </h1>

              <p className="mx-auto mt-3 max-w-[360px] text-[13px] leading-6 text-text-secondary">
                Access your account, favorites and shopping bag.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label className={labelClassName} htmlFor="email">
                  Email address
                </label>

                <input
                  {...register("email")}
                  className={inputClassName}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />

                {errors.email && (
                  <p id="email-error" className={errorClassName}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <button
                    className="cursor-pointer text-[11px] text-text-secondary underline decoration-border underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    disabled={isResettingPassword}
                    onClick={handleForgotPassword}
                  >
                    {isResettingPassword ? "Sending..." : "Forgot password?"}
                  </button>
                </div>

                <input
                  {...register("password")}
                  className={inputClassName}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />

                {errors.password && (
                  <p id="password-error" className={errorClassName}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authError && (
                <p
                  className="border border-accent/30 bg-accent/5 px-4 py-3 text-[12px] leading-5 text-accent"
                  role="alert"
                >
                  {authError}
                </p>
              )}

              {resetError && (
                <p
                  className="border border-accent/30 bg-accent/5 px-4 py-3 text-[12px] leading-5 text-accent"
                  role="alert"
                >
                  {resetError}
                </p>
              )}

              {resetMessage && (
                <p
                  className="border border-border bg-[#f7f5f1] px-4 py-3 text-[12px] leading-5 text-text-secondary"
                  role="status"
                >
                  {resetMessage}
                </p>
              )}

              <button
                className="flex h-12 w-full cursor-pointer items-center justify-center bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-[12px] text-text-secondary">
              New to IVORIA?
              <Link
                className="ml-1.5 text-text-primary underline decoration-border underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary"
                to="/register"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Login;
