describe("Mint Page", () => {
  before(() => {
    cy.intercept("GET", "/api/trackzs", { editions: [] }).as("getTrackzs");
    cy.intercept("POST", "api/mint", cy.spy().as("postMintSpy")).as("postMint");
  });

  beforeEach(() => cy.visit("/mint"));

  context("when the wallet is not connected", () => {
    it("displays a connect wallet button", () => {
      cy.get(`[aria-label="Mint"]`).should("not.exist");
      cy.get(`form button[aria-label="Connect wallet"]`)
        .should("be.visible")
        .click();
      cy.get(`[aria-label="Mint"]`).should("be.visible");
    });
  });

  context.only("with a connected wallet", () => {
    const submit = () =>
      cy.get(`button[type="submit"][aria-label="Mint"]`).click();

    beforeEach(() =>
      cy.get(`form button[aria-label="Connect wallet"]`).click()
    );

    it("can't submit without filling fields", () => {
      submit();
      cy.get("@postMintSpy").should("not.have.been.called");
    });

    it("can fullfill the form", () => {});
  });
});

export {};
