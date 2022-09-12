import { MintParams } from "lib/schema/mint-params-schema";

describe("api", () => {
  context("/trackzs", () => {
    it("should send back every trackzs in the contract", () => {
      cy.request("GET", "/api/trackzs").should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.editions)
          .to.be.an("array")
          .and.to.have.length.greaterThan(0);
      });
    });
  });

  context.only("/mint", () => {
    it("should send back a mint signature", () => {
      const params: MintParams = {
        authorAddress: "0xB04EC5ba60339019f31be9165D127Cd9C3E4EDA5",
        supply: 12,
        royalties: 10,
        metadata: {
          name: "Jambon",
          description: "Tout un programme",
          musicUri:
            "ipfs://QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/1.mp3",
          coverUri:
            "ipfs://QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/0.png",
        },
      };
      cy.request("POST", "/api/mint", JSON.stringify(params)).should(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.signedPayload).to.exist;
        }
      );
    });
  });
});

export {};
