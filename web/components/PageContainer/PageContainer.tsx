import Trackz from "models/trackz";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  const trackzs: Trackz[] = [
    {
      title: "Good morning genesis",
      author: "Noctambul",
      description: "A begining",
      totalSupply: 5,
      price: 5,
      coverUri:
        "https://gateway.pinata.cloud/ipfs/QmQ84bYsCupQXLcoMRYH51dzEFPKVrG3XLoCaCDg6oEasT",
      // "https://via.placeholder.com/600x400?text=aze",
      musicUri: "",
    },
  ];
  return (
    <>
      <Header />
      <div className="h-full bg-black">{children}</div>
      <Footer trackzs={trackzs} />
    </>
  );
}
