import ConnectButton from "components/Thirdweb/ConnectButton";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 flex h-12 w-screen items-center justify-between bg-bgc px-10 text-white">
      <h1
        className="text-lg font-extrabold text-primary"
        aria-label="Home Page"
      >
        <Link href="/">TRACKZ</Link>
      </h1>
      <nav>
        <ul className="flex list-none items-center gap-10 text-sm">
          <li aria-label="Mint Page">
            <Link href="/mint">Mint</Link>
          </li>
          <li aria-label="Connect Wallet">
            <ConnectButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
