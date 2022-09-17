import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useConst,
} from "@chakra-ui/react";
import { useWeb3 } from "context/Web3Context";
import { useRouter } from "next/router";
import { FiLogOut, FiMusic, FiUser } from "react-icons/fi";

export default function ConnectButton(): JSX.Element {
  const { address, connectWallet, disconnectWallet } = useWeb3();
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
          <MenuButton
            aria-label="User menu"
            // TODO: Animation will make the MenuItem moving ...
            // as={motion.button}
            // whileHover={{ scale: 1.1 }}
            // initial={{ scale: 1 }}
            // transition={{ type: "spring", stiffness: "400", damping: "10" }}
          >
            <Avatar
              bg="primary"
              size="sm"
              icon={<FiUser fontSize="1.4rem" />}
            />
          </MenuButton>
          <MenuList bg="bgc">
            <MenuItem
              {...itemProps}
              icon={<FiMusic fontSize={itemIconSize} />}
              onClick={() => router.push("/mint")}
              aria-label="Create track"
            >
              Create
            </MenuItem>
            <MenuItem
              {...itemProps}
              icon={<FiLogOut fontSize={itemIconSize} />}
              onClick={disconnectWallet}
              aria-label="Disconnect wallet"
            >
              Unsync
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <button onClick={connectWallet} aria-label="Connect wallet">
          Sync
        </button>
      )}
    </div>
  );
}
