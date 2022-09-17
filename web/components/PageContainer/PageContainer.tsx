import React from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = React.PropsWithChildren;

export default function PageContainer({ children }: Props): JSX.Element {
  return (
    <>
      <div className="mt-20 flex w-screen select-none justify-center px-2 pb-28 sm:mt-24">
        {children}
      </div>
      <Footer />
      <Header />
    </>
  );
}
