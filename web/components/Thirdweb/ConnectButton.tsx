import { useAddress, useMetamask } from "@thirdweb-dev/react";

export default function ConnectButton(): JSX.Element {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <div>
      {address ? (
        <div>
          CONNECTED
          {/* <div className="text- mb-1 h-4 w-4 rounded-full bg-primary"></div> */}
        </div>
      ) : (
        <button onClick={connectWithMetamask}>CONNECT</button>
      )}
    </div>
  );
}
