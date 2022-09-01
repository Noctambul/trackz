import ConnectButton from "components/Thirdweb/ConnectButton";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 flex h-12 w-screen items-center justify-around bg-bgc text-primary">
      <h1 className="text-3xl font-extrabold" aria-label="Home Page">
        <Link href="/">TRACKZ</Link>
      </h1>
      <nav>
        <ul className="flex list-none items-center gap-10 text-lg">
          <li aria-label="Mint Page">
            <Link href="/mint">MINT</Link>
          </li>
          <li aria-label="Connect Wallet">
            <ConnectButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
