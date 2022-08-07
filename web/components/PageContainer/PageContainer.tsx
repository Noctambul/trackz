import { Box } from "@chakra-ui/react";
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
      <Box marginTop="14" w="full" h="100%" bgColor="bgc" overflow="hidden">
        {children}
      </Box>
      <Header />
      <Footer trackzs={[]} />
    </>
  );
}
