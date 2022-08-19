import Slider from "components/uikit/Slider";

describe("Ui Kit", () => {
  describe("Slider.tsx", () => {
    // it("renders slider", () => {
    //   cy.mount(<Slider min={100} max={500} value={200} />);
    //   cy.get("h1").contains("Hello");
    // });

    context("when no label provided", () => {
      it("should not display the label", () => {
        // const onChangeSpy = cy.stub();
        // const onChange = (e) => console.log("Changed ! ", e.target.value);

        const value = 50;
        const min = 0;
        const max = 100;

        cy.mount(
          <Slider
            label="Coucou"
            min={min}
            max={max}
            value={value}
            // onChange={onChange}
          />
        );
        // cy.get(`label[for="minmaxRange"]`).should(
        //   (label) => expect(label).to.not.exist
        // );

        // cy.get(`input`).invoke("val", 3).trigger("change");
        cy.get("input").as("range").invoke("val", 3).trigger("change");
      });
    });
  });
});
