"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import VerifyEmailForms from "./verifyEmailForms";

export default function SingUpForms() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerify, setEmailVerifyCode] = useState(false);

  // clerk singin states
  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUp.create({ emailAddress: email, password, username: "email" });

      // enviar codigo de email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setEmailVerifyCode(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        // adicionar tradução de mensagens de erros, olhando o code do erro
        console.error("Sign in failed", error.errors);
        toast.error(error.errors[0].message);
        return;
      }

      toast.error("Something went wrong");

      return;
    }
  };

  if (emailVerify) {
    return <VerifyEmailForms />;
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie uma conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Já tem conta? {""}
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Faça o login
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
