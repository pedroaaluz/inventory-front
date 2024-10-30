"use client";

import Forms from "@/components/forms/forms";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordForms({
  email,
}: React.PropsWithChildren<{ email: string }>) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // clerk singin states
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const completeSingUp = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
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
      // reenviar codigo de email
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });
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
      <Forms
        header="Recuperar conta"
        handleSubmit={handleSubmit}
        inputs={[
          {
            id: "code",
            label: "Código",
            type: "text",
            required: true,
            autoComplete: "code",
            value: code,
            onChange: (e) => setCode(e.target.value),
          },
          {
            id: "password",
            label: "Nova senha",
            type: "password",
            required: true,
            autoComplete: "new-password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
          },
        ]}
        submitButtonText="Confirmar senha"
        formsFooterLink={{
          link: "O código não chegou?",
          text: "Clique aqui para reenviar.",
          onClick: resendCode,
        }}
      />
    </>
  );
}
