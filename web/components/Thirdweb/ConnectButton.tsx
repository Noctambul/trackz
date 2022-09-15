import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useConst,
} from "@chakra-ui/react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { FiLogOut, FiMusic, FiUser } from "react-icons/fi";

export default function ConnectButton(): JSX.Element {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();
  const router = useRouter();
  const itemIconSize = "1.2rem";
  const itemProps = useConst({
    _hover: { color: "primary", bg: "bgc" },
    _focus: { color: "primary", bg: "bgc" },
    color: "white",
  });

  return (
    <div>
      {address ? (
        <Menu>
          <MenuButton>
            <Avatar
              bg="primary"
              size="sm"
              icon={<FiUser fontSize="1.4rem" />}
            />
          </MenuButton>
          <MenuList bg="bgc" borderColor="lightgray">
            <MenuItem
              {...itemProps}
              icon={<FiMusic fontSize={itemIconSize} />}
              onClick={() => router.push("/mint")}
            >
              Create
            </MenuItem>
            <MenuItem
              {...itemProps}
              icon={<FiLogOut fontSize={itemIconSize} />}
              onClick={disconnect}
            >
              Unsync
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <button onClick={connectWithMetamask}>Sync</button>
      )}
    </div>
  );
}
