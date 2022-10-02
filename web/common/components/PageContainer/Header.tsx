import ConnectButton from "common/components/Web3/ConnectButton";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-12 w-screen items-center justify-between border-b bg-bgc px-4 text-white sm:px-10">
      <Link href="/">
        <h1
          aria-label="Home Page"
          className="text-3xl text-text after:text-primary after:content-['Z'] sm:text-2xl"
        >
          TRACK
        </h1>
      </Link>
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
