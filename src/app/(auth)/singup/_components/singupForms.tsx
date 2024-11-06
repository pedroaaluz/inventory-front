"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import VerifyEmailForms from "./verifyEmailForms";
import Forms from "@/components/forms/forms";
import {
  ClerkErrorCodesEnum,
  translateClerkError,
} from "@/utils/clerk/translateClerkError";

export default function SingUpForms() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailVerify, setEmailVerifyCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // clerk singin states
  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await signUp.create({ emailAddress: email, password, username });

      // enviar codigo de email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setEmailVerifyCode(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const errorTranslated = translateClerkError(
          error.errors[0].code as ClerkErrorCodesEnum
        );

        console.error("Sign in failed", error.errors);
        toast.error(errorTranslated.longMessage);
        return;
      }

      toast.error("Something went wrong");

      return;
    } finally {
      setIsLoading(false);
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
        submitButtonProps={{ isLoading }}
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
