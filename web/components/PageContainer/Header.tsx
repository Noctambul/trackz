import { Heading } from "@chakra-ui/react";
import ConnectButton from "components/Thirdweb/ConnectButton";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 flex h-12 w-screen items-center justify-between bg-bgc px-10 text-white">
      <Heading as="h1" fontSize="2xl" aria-label="Home Page" color="primary">
        <Link href="/">TRACKZ</Link>
      </Heading>
      <nav>
        <ul className="flex list-none items-center gap-10">
          <li aria-label="Connect Wallet">
            <a>
              <ConnectButton />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
