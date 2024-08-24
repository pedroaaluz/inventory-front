"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import VerifyEmailForms from "./verifyEmailForms";
import Forms from "@/components/forms/forms";

export default function SingUpForms() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailVerify, setEmailVerifyCode] = useState(false);

  // clerk singin states
  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUp.create({ emailAddress: email, password, username });

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
      <Forms
        header="Crie uma conta"
        handleSubmit={handleSubmit}
        inputs={[
          {
            value: email,
            onChange: (e) => setEmail(e.target.value),
            autoComplete: "email",
            required: true,
            type: "email",
            id: "email",
            label: "Email",
          },
          {
            value: username,
            onChange: (e) => setUsername(e.target.value),
            autoComplete: "username",
            required: true,
            type: "text",
            id: "username",
            label: "Nome de usuário",
          },
          {
            value: password,
            onChange: (e) => setPassword(e.target.value),
            autoComplete: "current-password",
            required: true,
            type: "password",
            id: "password",
            label: "Senha",
          },
        ]}
        submitButtonText="Criar conta"
        formsFooterLink={{
          href: "/login",
          link: "Faça o login",
          text: "Já tem conta?",
        }}
      />
    </>
  );
}
