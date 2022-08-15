import ProgressBar from "components/AudioPlayer/ProgressBar";
import { AudioProvider } from "context/AudioContext";

describe("Audio", () =>
  describe("ProgressBar.tsx", () => {
    it("renders", () => {
      cy.mount(
        <AudioProvider>
          <div className="flex h-full w-full">
            <ProgressBar
              progress={0}
              duration={100}
              setProgress={(p) => console.log("Progress ", p)}
            />
          </div>
        </AudioProvider>
      );
    });
  }));
