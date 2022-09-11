import React from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = React.PropsWithChildren;

export default function PageContainer({ children }: Props): JSX.Element {
  return (
    <>
      <div className="mt-24 mr-44 flex w-screen select-none justify-center pb-28">
        {children}
      </div>
      <Footer />
      <Header />
    </>
  );
}
