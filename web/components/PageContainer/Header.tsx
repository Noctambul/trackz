export default function Header(): JSX.Element {
  return (
    <header className="flex flex-1 items-center justify-around bg-bgc text-primary w-screen h-10">
      <h1>TRACKZ</h1>
      <div className="rounded-full text- border-amber-400 bg-primary w-2 h-2"></div>
      <div className="bg-bgc"></div>
    </header>
  );
}
