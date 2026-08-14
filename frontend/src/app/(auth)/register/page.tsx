"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name."),
    email: z.string().email("Enter a valid college email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit() {
    setStatusMessage(
      "Registration form validation passed. We will connect this to the CampusGPT registration API next."
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 lg:grid lg:grid-cols-2">
      <section className="order-2 flex items-center justify-center px-6 py-12 sm:px-10 lg:order-1">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 transition hover:text-cyan-300"
          >
            ← Back to home
          </Link>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Start here
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Create your CampusGPT account
            </h1>
            <p className="mt-3 leading-7 text-slate-400">
              Get reliable campus guidance with clear, source-backed answers.
            </p>
          </div>

          <form
            className="mt-8 space-y-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-2 text-sm text-rose-300">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                College email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@college.edu"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-2 text-sm text-rose-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                {...register("password")}
              />
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="mt-2 text-sm text-rose-300"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  role="alert"
                  className="mt-2 text-sm text-rose-300"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            {statusMessage && (
              <p
                role="status"
                className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100"
              >
                {statusMessage}
              </p>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <section className="order-1 hidden flex-col justify-between bg-cyan-400 p-12 text-slate-950 lg:order-2 lg:flex">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-300">
            C
          </span>
          CampusGPT
        </Link>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em]">
            Built for learning
          </p>
          <h2 className="mt-5 max-w-md text-5xl font-semibold tracking-tight">
            Ask better questions. Get grounded answers.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-800">
            CampusGPT brings approved policies, resources, and academic
            information into one focused experience.
          </p>
        </div>

        <p className="text-sm font-medium text-slate-800">
          Student accounts are created with secure role-based access.
        </p>
      </section>
    </main>
  );
}