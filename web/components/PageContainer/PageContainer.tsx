import { Container, Spinner } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = PropsWithChildren<{
  isLoading?: boolean;
  disableLayout?: boolean;
}>;

export default function PageContainer({
  children,
  isLoading = false,
}: Props): JSX.Element {
  return (
    <>
      <div className="fixed top-12 bottom-12 w-screen overflow-y-scroll py-6 px-8">
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
