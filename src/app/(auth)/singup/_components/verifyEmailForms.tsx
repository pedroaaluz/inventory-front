"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function VerifyEmailForms() {
  const [code, setCode] = useState("");
  const router = useRouter();

  // clerk singin states
  const { isLoaded, signUp, setActive } = useSignUp();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const completeSingUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSingUp.createdSessionId });
      router.push("/");
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

  const resendCode = async () => {
    try {
      // enviar codigo de email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verifique o código enviado ao seu email
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
                Código
              </label>
              <div className="mt-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirmar código
              </button>
              <button
                type="button"
                onClick={resendCode}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reenviar código
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
