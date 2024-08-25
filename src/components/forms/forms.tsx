import { DOMAttributes, FormEvent } from "react";
import InputFormsCustom, { CustomFormsInputProps } from "./formsInput";
import FormsBody from "./formsBody";
import FormsContainer from "./formsContainer";
import FormsHeader from "./formsHeader";
import SubmitFormsButton from "./submitFormsButton";
import FormsFooterLink, { FormsFooterLinkProps } from "./formsFooterLink";

interface FormsProps {
  header: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: CustomFormsInputProps[];
  submitButtonText: string;
  formsFooterLink: Omit<FormsFooterLinkProps, "children"> & { text: string };
  submitButtonProps?: {
    isLoading?: boolean;
  };
}

export default function Forms({
  header,
  handleSubmit,
  inputs,
  submitButtonText,
  formsFooterLink,
  submitButtonProps,
}: FormsProps) {
  return (
    <>
      <FormsContainer>
        <FormsHeader>{header}</FormsHeader>
        <FormsBody handleSubmit={handleSubmit}>
          {inputs.map((input) => (
            <InputFormsCustom {...input} key={input.id} />
          ))}
          <SubmitFormsButton
            isLoading={submitButtonProps?.isLoading}
            text={submitButtonText}
          />

          <FormsFooterLink
            link={formsFooterLink.link}
            href={formsFooterLink.href}
            onClick={formsFooterLink.onClick}
          >
            {formsFooterLink.text}
          </FormsFooterLink>
        </FormsBody>
      </FormsContainer>
    </>
  );
}
