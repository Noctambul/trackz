describe("Navigation", () => {
  context("from the Homepage", () => {
    const sync = () => cy.get(`button[aria-label="Connect wallet"]`).click();
    const openUserMenu = () => cy.get(`button[aria-label="User menu"]`).click();
    beforeEach(() => cy.visit("/"));

    it("can connect wallet", () => {
      cy.get(`button[aria-label="Connect wallet"]`)
        .should("exist")
        .should("contain.text", "Connect Wallet")
        .click();
      openUserMenu().should("exist");
    });

    it("can diconnect wallet", () => {
      sync();
      openUserMenu();
      cy.get(`button[aria-label="Disconnect wallet"]`)
        .should("exist")
        .should("contain.text", "Disconnect")
        .click();
      cy.get(`button[aria-label="Connect wallet"]`).should("exist");
    });

    context("when wallet is connected", () => {
      beforeEach(() => sync());

      it("navigate to the Mint page", () => {
        openUserMenu();
        cy.get(`button[aria-label="Create track"]`).click();
        cy.url().should("include", "/mint");
      });
    });
  });

  context("from the Mint page", () => {
    beforeEach(() => cy.visit("/mint"));

    it("navigate to the Homepage", () => {
      cy.get(`h1[aria-label="Home Page"]`).click();
      cy.url().should("include", "/");
    });
  });
});

export {};
