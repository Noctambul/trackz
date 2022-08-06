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
      <Box marginTop="14" w="full" h="100%" bgColor="red.400" overflow="hidden">
        {children}
      </Box>
      <Footer />
    </>
  );
}
