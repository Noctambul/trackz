import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useWeb3 } from "common/context/Web3Context";
import { useRouter } from "next/router";
import { FiLogOut, FiMusic, FiUser } from "react-icons/fi";

export default function ConnectButton(): JSX.Element {
  const { address, connectWallet, disconnectWallet } = useWeb3();
  const router = useRouter();
  const itemIconSize = "1.2rem";

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
              icon={<FiMusic fontSize={itemIconSize} />}
              onClick={() => router.push("/mint")}
              aria-label="Create track"
            >
              Create
            </MenuItem>
            <MenuItem
              icon={<FiLogOut fontSize={itemIconSize} />}
              onClick={disconnectWallet}
              aria-label="Disconnect wallet"
            >
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button size="sm" onClick={connectWallet} aria-label="Connect wallet">
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
