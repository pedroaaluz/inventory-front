export default function FormsFooterLink({
  children,
  href,
  link,
}: {
  children: React.ReactNode;
  href: string;
  link: string;
}) {
  return (
    <div>
      <p className="mt-10 text-center text-sm text-gray-500">
        {children}{" "}
        <a
          href={href}
          className="font-semibold leading-6 text-[#008A91] hover:text-[#00777d]"
        >
          {link}
        </a>
      </p>
    </div>
  );
}
