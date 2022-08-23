describe("Audio Player", () => {
  it("should display the player when selected a Trackz", () => {
    cy.visit("/");
    cy.get("[data-test-audio-player]").should("not.exist");
    cy.get(`[data-test-trackz-card="1"] [data-test-play-button]`).click();
    cy.get(`[data-test-audio-player]`).should("exist");
    cy.get(`[data-test-trackz-card="1"] [data-test-play-button]`).click();
  });
});

export {};
