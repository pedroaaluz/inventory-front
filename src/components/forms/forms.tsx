import { FormEvent } from "react";
import InputFormsCustom, { CustomFormsInputProps } from "./formsInput";
import FormsBody from "./formsBody";
import FormsContainer from "./formsContainer";
import FormsHeader from "./formsHeader";
import SubmitFormsButton from "./submitFormsButton";
import FormsFooterLink from "./formsFooterLink";

interface FormsProps {
  header: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: CustomFormsInputProps[];
  submitButtonText: string;
  formsFooterLink: {
    href: string;
    link: string;
    text: string;
  };
}

export default function Forms({
  header,
  handleSubmit,
  inputs,
  submitButtonText,
  formsFooterLink,
}: FormsProps) {
  return (
    <>
      <FormsContainer>
        <FormsHeader>{header}</FormsHeader>
        <FormsBody handleSubmit={handleSubmit}>
          {inputs.map((input) => (
            <InputFormsCustom {...input} key={input.id} />
          ))}
          <SubmitFormsButton text={submitButtonText} />

          <FormsFooterLink
            link={formsFooterLink.link}
            href={formsFooterLink.href}
          >
            {formsFooterLink.text}
          </FormsFooterLink>
        </FormsBody>
      </FormsContainer>
    </>
  );
}
