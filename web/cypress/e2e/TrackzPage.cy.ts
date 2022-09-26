import TrackzMetadata from "common/models/TrackzMetadata";
import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import trackzMetadata from "../fixtures/trackzs.json";

const trackzs = trackzMetadata.editions
  .map((metadata) => EditionMetadataSchema.parse(metadata))
  .reverse() as TrackzMetadata[];

const trackz = trackzs[0];

describe("Trackz Page", () => {
  beforeEach(() => {
    cy.fixture("trackzs")
      .as("trackzs")
      .then((trackzs: any[]) => {
        cy.intercept("GET", "api/trackzs", {
          statusCode: 200,
          body: trackzs,
        }).as("getTrackzs");
      });

    cy.visit(`/trackzs/${trackz.id}`);
  });

  it("displays the Trackz informations", () => {
    cy.get(`[aria-label="Track Name"]`).should("contain.text", trackz.name);
    cy.get(`[aria-label="Creator"]`).should("contain.text", trackz.creator);
    cy.get(`[aria-label="Track Description"]`).should(
      "contain.text",
      trackz.description
    );

    trackz.tags
      ?.split(",")
      .forEach((tag) =>
        cy.get(`[aria-label="Track Tags"]`).should("contain.text", tag)
      );

    cy.get(`[aria-label="Track Supply"]`).should(
      "contain.text",
      `Edition of ${trackz.totalSupply}`
    );
  });
});

export {};
