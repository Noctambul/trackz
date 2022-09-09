import { useIpfs } from "hooks/useIpfs";

// Skip for the moment as we don't use this feature
describe.skip("useIpfs", () => {
  const { resolveLink } = useIpfs();

  before(() => {
    // Check if the import worked correctly
    expect(resolveLink).to.be.a("function");
  });

  context("resolveLink", () => {
    it("does nothing if the given link is not an ipfs link", () => {
      [
        "https://trackz.xyz/test/sound.mp3",
        "music/test.mp3",
        "http://trackz.xyz/test/sound.mp3",
        "www.trackz.xyz/test/sound.mp3",
      ].forEach((url) => expect(resolveLink(url)).to.eq(url));
    });

    it("add the ipfs provider to the given url if the given link is an ipfs link", () => {
      expect(
        resolveLink("ipfs://QmUqU31giwHyMQkoV5vy4uHLZi1aitzUm83v17FBqWXLyn")
      ).to.eq(
        `${Cypress.env(
          "NEXT_PUBLIC_IPFS_PROVIDER_URI"
        )}QmUqU31giwHyMQkoV5vy4uHLZi1aitzUm83v17FBqWXLyn`
      );
    });
  });
});

export {};
