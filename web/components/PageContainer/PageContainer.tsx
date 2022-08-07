import React from "react";

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  return (
    <>
      {/* <Header />
      <div className="h-full bg-black">{children}</div>
      <Footer trackzs={trackzs} /> */}
      <div className="relative flex h-[550rem] bg-green-400"></div>
      <div className="fixed top-0 left-0 flex h-10 w-full bg-red-400"></div>
      <div className="fixed bottom-0 left-0 flex h-10 w-full bg-blue-400"></div>
    </>
  );
}
