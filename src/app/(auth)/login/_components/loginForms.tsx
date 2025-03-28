"use client";

import { useSignIn, useAuth } from "@clerk/nextjs";
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (userId) {
    router.push("/products");
  }
  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
        submitButtonProps={{ isLoading }}
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
