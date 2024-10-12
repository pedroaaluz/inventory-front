"use client";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ResetPasswordForms from "./resetPasswordForms";
import Forms from "@/components/forms/forms";

export default function RequestResetPasswordForms() {
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerifyCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // clerk singin states
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  if (emailVerify) return <ResetPasswordForms email={email} />;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Forms
          header="Recuperar conta"
          handleSubmit={handleSubmit}
          inputs={[
            {
              id: "email",
              label: "Email",
              type: "email",
              required: true,
              autoComplete: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
            },
          ]}
          submitButtonProps={{ isLoading }}
          submitButtonText="Enviar código de recuperação"
          formsFooterLink={{
            href: "/login",
            link: "clique aqui!",
            text: "Para voltar ao login",
          }}
        />
      </div>
    </>
  );
}
