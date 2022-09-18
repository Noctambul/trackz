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
      <div className="h-screen w-screen pt-12">
        {isLoading ? (
          <Container centerContent h="500px" style={{ display: "flex" }}>
            <Spinner size="xl" />
          </Container>
        ) : (
          children
        )}
        <div className="h-14"></div>
      </div>
      )
      <Footer />
      <Header />
    </>
  );
}
