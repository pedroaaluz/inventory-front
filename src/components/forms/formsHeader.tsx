import Image from "next/image";
import imageLogo from "../../../public/logo.png";

export default function FormsHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="logo"
          src={imageLogo}
          width={100}
          height={100}
          className="mx-auto w-auto"
        />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {children}
        </h2>
      </div>
    </div>
  );
}
