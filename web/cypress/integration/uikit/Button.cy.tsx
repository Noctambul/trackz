import Button from "common/components/uikit/Button";

describe("uikit/Button.tsx", () => {
  it("displays the content", () => {
    cy.mount(<Button>My content</Button>);
    cy.get("button").should("have.text", "My content");
    cy.get(`span[aria-label="Loading"]`).should("not.exist");
  });

  it("has a disabled state", () => {
    cy.mount(<Button isDisabled>My Disabled Button</Button>);
    cy.get("button").should("be.disabled");
    cy.get(`span[aria-label="Loading"]`).should("not.exist");
  });

  it("has a loading state", () => {
    cy.mount(
      <Button isLoading loadingText="I am Loading">
        My Loading Button
      </Button>
    );
    cy.get("button").should("be.disabled").should("have.text", "I am Loading");
    cy.get(`span[aria-label="Loading"]`).should("exist");
  });
});

export {};
