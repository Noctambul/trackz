import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

export default function ConnectButton(): JSX.Element {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <div>
      {/* <div className="text- mb-1 h-4 w-4 rounded-full bg-primary"></div> */}
      {address ? (
        <div>
          <button onClick={disconnect}>DISCONNECT</button>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>CONNECT</button>
      )}
    </div>
  );
}
