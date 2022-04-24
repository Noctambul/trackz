import { Space } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import Song from "components/Song/Song";
import { Web3Context, Web3ContextInterface } from "context/Web3Context";
import type { NextPage } from "next";
import { useContext } from "react";
import styles from "styles/Home.module.less";

const Home: NextPage = () => {
  const { tokens } = useContext(Web3Context) as Web3ContextInterface;
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const fetchNFTsWithThirdweb = async () => {
  //   setIsLoading(true);
  //   const provider = await Moralis.enableWeb3();
  //   const sdk = new ThirdwebSDK(provider);
  //   const contract = sdk.getEdition(nftCollectionAddress);
  //   const nfts = await contract.getAll();
  //   const tokensMetadata = nfts.map((nft) => nft.metadata as TokenMetadata);
  //   setTokens(tokensMetadata);
  //   console.log(tokensMetadata);
  //   setIsLoading(false);
  // };

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="moralis">
  //       <Button
  //         size="small"
  //         type="text"
  //         onClick={fetchNFTsForContract}
  //         loading={isLoading}
  //       >
  //         Fetch NFTs With Moralis
  //       </Button>
  //     </Menu.Item>
  //     <Menu.Item key="thirdweb">
  //       <Button
  //         size="small"
  //         type="text"
  //         onClick={fetchNFTsWithThirdweb}
  //         loading={isLoading}
  //       >
  //         Fetch NFTs With Thirdweb
  //       </Button>
  //     </Menu.Item>
  //   </Menu>
  // );

  // useEffect(() => {
  //   fetchNFTsForContract();
  // });

  return (
    <PageContainer>
      <>
        {/* <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <SettingOutlined />
          </a>
        </Dropdown> */}
        {/* <span>{isLoading}</span> */}
        <Space
          direction="vertical"
          align="center"
          size="middle"
          className={styles.mixContainer}
        >
          {tokens.map((tokenMetadata, i) => (
            <Song key={i} metadata={tokenMetadata} />
          ))}
        </Space>
      </>
    </PageContainer>
  );
};

export default Home;
