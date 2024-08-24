"use client";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Forms from "@/components/forms/forms";
import {
  ClerkErrorCodesEnum,
  translateClerkError,
} from "@/utils/clerk/translateClerkError";

export default function LoginForms() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const errorTranslated = translateClerkError(
          error.errors[0].code as ClerkErrorCodesEnum
        );

        console.error("Sign in failed", {
          originalError: error.errors,
          errorTranslated,
        });

        toast.error(errorTranslated.longMessage);

        return;
      }

      toast.error("Something went wrong");

      return;
    }
  };

  return (
    <>
      <Forms
        formsFooterLink={{
          href: "/singup",
          text: "Ainda não tem conta?",
          link: "Clique aqui",
        }}
        handleSubmit={handleSubmit}
        header="Entre com sua conta"
        inputs={[
          {
            value: email,
            onChange: (e) => setEmail(e.target.value),
            autoComplete: "email",
            required: true,
            type: "email",
            name: "email",
            id: "email",
            label: "Email",
            auxLink: "esqueceu sua senha?",
          },
          {
            value: password,
            onChange: (e) => setPassword(e.target.value),
            autoComplete: "current-password",
            required: true,
            type: "password",
            name: "password",
            id: "password",
            label: "Senha",
          },
        ]}
        submitButtonText="Entrar"
      />
    </>
  );
}
