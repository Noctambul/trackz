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
      <Header />
      <div className="h-full bg-black">{children}</div>
      <Footer trackzs={trackzs} />
    </>
  );
}
