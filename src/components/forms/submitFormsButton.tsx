import React from "react";

export default function SubmitFormsButton({ text }: { text: string }) {
  return (
    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-[#008A91] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00777d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008A91]"
      >
        {text}
      </button>
    </div>
  );
}
