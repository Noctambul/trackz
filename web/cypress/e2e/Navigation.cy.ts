describe("Navigation", () => {
  context("from the Homepage", () => {
    beforeEach(() => cy.visit("/"));

    it.skip("navigate to the Mint page", () => {
      cy.get(`nav [aria-label="Mint Page"]`).click();
      cy.url().should("include", "/mint");
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
