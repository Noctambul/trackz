import { Box } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  // const { currentAccount } = useContext(Web3Context) as Web3ContextInterface;

  const theme = useTheme();

  return (
    <>
      <Header />
      <Box width="100%" height="550vh" bgColor="bgc">
        {children}
      </Box>
      <Footer />
    </>
  );
}
