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

  // context("/mint", () => {
  //   it("should send back a signature mint", () => {
  //     cy.request("POST", "/api/mint")
  //   })
  // })
});

export {};
