import { Container, Spinner } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = PropsWithChildren<{
  isLoading?: boolean;
  disableMargins?: boolean;
}>;

export default function PageContainer({
  children,
  isLoading = false,
  disableMargins = false,
}: Props): JSX.Element {
  const marginStyles = "py-5 px-5 sm:py-8 sm:px-10";

  return (
    <>
      <div
        className={`fixed top-12 bottom-14 w-screen overflow-y-scroll bg-bgc ${
          disableMargins ? "" : marginStyles
        }`}
      >
        {isLoading ? (
          <Container centerContent h="500px" style={{ display: "flex" }}>
            <Spinner size="xl" />
          </Container>
        ) : (
          children
        )}
      </div>
      )
      <Footer />
      <Header />
    </>
  );
}
