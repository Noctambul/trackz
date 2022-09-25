import { Heading } from "@chakra-ui/react";
import ConnectButton from "common/components/Web3/ConnectButton";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-12 w-screen items-center justify-between bg-bgc px-4 text-white sm:px-10">
      <Heading
        as="h1"
        fontSize={{ base: "3xl", sm: "2xl" }}
        aria-label="Home Page"
        color="text"
      >
        <Link href="/">
          <span
            role="button"
            aria-label="Home"
            className="after:text-primary after:content-['Z']"
          >
            TRACK
          </span>
        </Link>
      </Heading>
      <nav>
        <ul className="flex list-none items-center gap-10">
          <li aria-label="User Menu">
            <ConnectButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
