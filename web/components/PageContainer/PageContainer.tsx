import { Box } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { Web3Context, Web3ContextInterface } from "context/Web3Context";
import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  const { currentAccount } = useContext(Web3Context) as Web3ContextInterface;

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
