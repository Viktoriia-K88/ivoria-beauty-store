import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

import Container from "../../components/Container/Container";
import { auth } from "../../config/firebase";

const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, "Enter your first name."),
    lastName: z.string().trim().min(2, "Enter your last name."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function getFirebaseErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Unable to create your account. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";

    case "auth/invalid-email":
      return "Enter a valid email address.";

    case "auth/weak-password":
      return "Please choose a stronger password.";

    case "auth/network-request-failed":
      return "Check your internet connection and try again.";

    default:
      return "Unable to create your account. Please try again.";
  }
}

function Register() {
  const navigate = useNavigate();

  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setAuthError("");

      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(credential.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      navigate("/account");
    } catch (error) {
      setAuthError(getFirebaseErrorMessage(error));
    }
  }

  const inputClassName =
    "h-12 w-full border border-border bg-surface px-4 text-[13px] outline-none transition-colors placeholder:text-text-secondary/55 focus:border-text-primary";

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
                Create an account
              </h1>

              <p className="mx-auto mt-3 max-w-[380px] text-[13px] leading-6 text-text-secondary">
                Save your favorites, manage your shopping bag and keep your
                beauty edit close.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="firstName">
                    First name
                  </label>

                  <input
                    {...register("firstName")}
                    className={inputClassName}
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                  />

                  {errors.firstName && (
                    <p className={errorClassName}>{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClassName} htmlFor="lastName">
                    Last name
                  </label>

                  <input
                    {...register("lastName")}
                    className={inputClassName}
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                  />

                  {errors.lastName && (
                    <p className={errorClassName}>{errors.lastName.message}</p>
                  )}
                </div>
              </div>

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
                />

                {errors.email && (
                  <p className={errorClassName}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className={labelClassName} htmlFor="password">
                  Password
                </label>

                <input
                  {...register("password")}
                  className={inputClassName}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                />

                {errors.password && (
                  <p className={errorClassName}>{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className={labelClassName} htmlFor="confirmPassword">
                  Confirm password
                </label>

                <input
                  {...register("confirmPassword")}
                  className={inputClassName}
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                />

                {errors.confirmPassword && (
                  <p className={errorClassName}>
                    {errors.confirmPassword.message}
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

              <button
                className="flex h-12 w-full cursor-pointer items-center justify-center bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-[12px] text-text-secondary">
              Already have an account?
              <Link
                className="ml-1.5 text-text-primary underline decoration-border underline-offset-4 transition-opacity hover:opacity-60"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Register;
