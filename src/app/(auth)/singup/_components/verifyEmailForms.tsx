"use client";

import Forms from "@/components/forms/forms";
import {
  ClerkErrorCodesEnum,
  translateClerkError,
} from "@/utils/clerk/translateClerkError";
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

      return;
    }
  };

  const resendCode = async () => {
    try {
      // enviar codigo de email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.info("Código reenviado");
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
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
        return;
      }

      toast.error("Something went wrong");

      return;
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Forms
          header="Verifique o código enviado ao seu email"
          handleSubmit={handleSubmit}
          inputs={[
            {
              id: "email",
              label: "Código",
              type: "text",
              required: true,
              autoComplete: "code",
              value: code,
              onChange: (e) => setCode(e.target.value),
            },
          ]}
          submitButtonProps={{ isLoading: false }}
          submitButtonText="Confirmar código"
          formsFooterLink={{
            link: "Clique aqui para reenviar.",
            text: "O código não chegou?",
            onClick: resendCode,
          }}
        />
      </div>
    </>
  );
}
