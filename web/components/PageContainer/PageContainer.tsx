import trackzs from "data/trackzs";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  return (
    <>
      <div className="h-full bg-black">{children}</div>
      <Footer trackzs={trackzs} />
      <Header />

      {/* <div className="relative flex h-[550rem] bg-green-400"></div>
      <div className="fixed top-0 left-0 flex h-10 w-full bg-red-400"></div>
      <div className="fixed bottom-0 left-0 flex h-10 w-full bg-blue-400"></div> */}
    </>
  );
}
