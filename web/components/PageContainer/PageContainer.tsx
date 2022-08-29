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
      <div className="mt-12 flex w-full items-center justify-center pb-28">
        {children}
      </div>
      <Footer />
      <Header />
    </>
  );
}
