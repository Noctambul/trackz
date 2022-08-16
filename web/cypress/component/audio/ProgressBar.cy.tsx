import ProgressBar from "components/AudioPlayer/ProgressBar";

describe("Audio", () =>
  describe("ProgressBar.tsx", () => {
    it("renders", () => {
      cy.viewport("macbook-11");
      cy.mount(
        <div className="flex h-full w-full items-center justify-center">
          <ProgressBar
            progress={0}
            duration={100}
            onSearch={(val) => console.log("Search value ", val)}
            onSearchEnd={() => console.log("Search END")}
          />
        </div>
      );
    });
  }));

export {};
