import { Box, Button, Slide, useDisclosure } from "@chakra-ui/react";

export default function Test(): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <p className="h-[100px] w-[200px] truncate bg-primary">
        AAAZEAZLEJAMELFNELKGDFKGBGDFHGDPFOJGPSODJFZPODJFSMLDFJSMDLFJSDMLFJSDMLFJ
      </p>
      {/* <div className="fixed bottom-0 z-10 h-14 w-screen bg-primary"> */}
      <Box bg="primary" position="fixed" bottom="0" w="full" zIndex="10">
        <Box w="full" bg="red">
          <div>
            <Button onClick={onToggle}>Nothing</Button>
            <Button onClick={onToggle}>Again</Button>
            <Button onClick={onToggle}>Oskour</Button>
            <Button onClick={onToggle}>Trigger</Button>
            <Slide
              direction="bottom"
              in={isOpen}
              style={{
                position: "fixed",
                paddingBottom: "3.5rem",
                marginLeft: "auto",
                width: "390px",
                zIndex: -1,
              }}
            >
              <Box p="40px" color="white" mt="4" bg="teal.500">
                Ok
              </Box>
            </Slide>
          </div>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
