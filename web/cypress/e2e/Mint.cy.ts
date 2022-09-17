describe("Mint Page", () => {
  let postMintCallCount = 0;

  beforeEach(() => {
    cy.intercept("GET", "/api/trackzs", { editions: [] }).as("getTrackzs");
    cy.intercept("POST", "api/mint", (req) => {
      postMintCallCount++;
      req.reply({ statusCode: 200 });
    }).as("postMint");

    postMintCallCount = 0;
    cy.visit("/mint");
  });

  context("when the wallet is not connected", () => {
    it("displays a connect wallet button", () => {
      cy.get(`[aria-label="Mint"]`).should("not.exist");
      cy.get(`form button[aria-label="Connect wallet"]`)
        .should("be.visible")
        .click();
      cy.get(`[aria-label="Mint"]`).should("be.visible");
    });
  });

  context("with a connected wallet", () => {
    const submit = () =>
      cy.get(`button[type="submit"][aria-label="Mint"]`).click();
    const inputMusicFile = () => cy.get(`input[type="file"][name="musicFile"]`);
    const inputCoverFile = () => cy.get(`input[type="file"][name="coverFile"]`);
    const inputName = () => cy.get(`input[type="text"][name="name"]`);
    const inputDescription = () => cy.get(`textarea[name="description"]`);
    const inputTags = () => cy.get(`input[type="text"][name="tags"]`);
    const inputSupply = () => cy.get(`input[type="text"][name="supply"]`);
    const inputRoyalties = () => cy.get(`input[type="text"][name="royalties"]`);

    beforeEach(() =>
      cy.get(`form button[aria-label="Connect wallet"]`).click()
    );

    it("can't submit without filling fields", () => {
      submit();
      expect(postMintCallCount).eq(
        0,
        "The api/mint end point should have not been called"
      );
    });

    it("can fullfill the form", () => {
      inputMusicFile().attachFile("assets/music.mp3");
      inputCoverFile().attachFile("assets/cover.png");
      inputName().type("My title");
      inputDescription().type("My description");
      inputTags().type("tag, electro");
      inputSupply().type("12");
      inputRoyalties().type("16");
      submit();
      cy.wait("@postMint").then(() => {
        expect(postMintCallCount).eq(
          1,
          "The api/mint end point should have been called once"
        );
        cy.location().should((location) =>
          expect(location.pathname).to.eq("/")
        );
      });
    });

    it("can't fill input files with wrong format", () => {
      inputMusicFile().attachFile("assets/text-file.txt");
      inputCoverFile().attachFile("assets/text-file.txt");
      cy.contains("Should be an audio file");
      cy.contains("Should be an image file");
    });
  });
});

export {};
