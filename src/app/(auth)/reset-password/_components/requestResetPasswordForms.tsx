"use client";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ResetPasswordForms from "./resetPasswordForms";

export default function RequestResetPasswordForms() {
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerifyCode] = useState(false);

  // clerk singin states
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });

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

  if (emailVerify) return <ResetPasswordForms email={email} />;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recuperar conta
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar código de recuperação
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Para voltar ao login, {""}
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                clique aqui!
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
