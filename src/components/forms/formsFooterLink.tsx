import { MouseEvent } from "react";

export interface FormsFooterLinkProps {
  children: React.ReactNode;
  href?: string;
  link: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export default function FormsFooterLink({
  children,
  href,
  link,
  onClick,
}: FormsFooterLinkProps) {
  return (
    <div>
      <p className="mt-10 text-center text-sm text-gray-500">
        {children}{" "}
        <a
          onClick={onClick}
          href={href}
          className="font-semibold leading-6 text-[#008A91] hover:text-[#00777d]"
        >
          {link}
        </a>
      </p>
    </div>
  );
}
