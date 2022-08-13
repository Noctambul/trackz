import { expect, test } from "@playwright/experimental-ct-react";
import TestingComponent from "../components/TestingComponents/TestingComponent";

test("it renders", async ({ mount, page }) => {
  const component = await mount(<TestingComponent />);
  const title = component.locator("h1");
  const content = component.locator("p");
  await expect(title).toContainText("Hello");
  await expect(content).toContainText("World");
});
