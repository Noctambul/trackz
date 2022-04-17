import { Button } from "antd";
import { useContext } from "react";
import { Web3Context, Web3ContextInterface } from "../../context/Web3Context";
import styles from "./ConnectButton.module.less";

export default function ConnectButton(): JSX.Element {
  const { connectWallet, disconnectWallet, currentAccount } = useContext(
    Web3Context
  ) as Web3ContextInterface;

  return (
    <div className={styles.container}>
      {currentAccount ? (
        <>
          <div className={styles.currentAccount}>
            <span className={styles.accountAddress}>
              {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
            </span>
          </div>
          <Button type="primary" onClick={disconnectWallet}>
            Logout
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={connectWallet}>
          Login
        </Button>
      )}
    </div>
  );
}
