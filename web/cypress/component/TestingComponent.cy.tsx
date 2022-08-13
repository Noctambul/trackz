import TestingComponent from "components/TestingComponents/TestingComponent";
// import { mount } from '@cypress/react';

describe("TestingComponent.cy.ts", () => {
  it("renders component", () => {
    const component = cy.mount(<TestingComponent />);
    component.get("h1").contains("Hello");
    component.get("p").contains("World");
  });
});
