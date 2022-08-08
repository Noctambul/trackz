export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 flex h-12 w-screen items-center justify-around text-black">
      <h1 className="text-3xl font-extrabold">TRACKZ</h1>
      <div className="text- h-4 w-4 rounded-full bg-primary"></div>
    </header>
  );
}
