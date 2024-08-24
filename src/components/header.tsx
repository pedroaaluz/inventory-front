import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="flex gap-2">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Sobre</a>
          </li>
          <li>
            <a>Contato</a>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
