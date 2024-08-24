import { FormEvent } from "react";

export default function FormsBody({
  children,
  handleSubmit,
}: {
  children: React.ReactNode;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        action="#"
        method="POST"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </div>
  );
}
