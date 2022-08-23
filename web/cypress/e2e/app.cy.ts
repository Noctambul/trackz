describe("Navigation", () => {
  it("should display the title", () => {
    cy.visit("/");
    cy.get("h1").contains("TRACKZ");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
