import { cy, it as itCypress, expect } from "local-cypress";

type ElementResolver = () => Cypress.Chainable;

import type {
  Assertions,
  AssertionsNot,
  Driver,
  Interactions,
  ItCallback,
  PathAssertions,
} from "../../types";
import { mockEndpoint } from "./utils";

function makePathAssertions(): PathAssertions {
  return {
    locationShouldEqual: (path: string) => () => {
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(path);
      });
    },
  };
}

function makeAssertions(elementResolver: ElementResolver): Assertions {
  return {
    shouldBeVisible: () => () => elementResolver().should(`be.visible`),
    shouldHaveAttribute: (attribute, value) => () =>
      elementResolver().should(`have.attr`, attribute).and(`match`, value),
  };
}

function makeAssertionsNot(elementResolver: ElementResolver): AssertionsNot {
  return {
    shouldNotBeVisible: () => () => elementResolver().should(`not.be.visible`),
    shouldNotExist: () => () => elementResolver().should(`not.exist`),
  };
}

function makeInteractions(elementResolver: ElementResolver): Interactions {
  return {
    click: () => () => {
      elementResolver().click();
    },
    check: () => () => {
      elementResolver().check();
    },
    type: (text: string) => () => {
      elementResolver().clear();
      elementResolver().type(text);
    },
  };
}

function makeAssertionsInteractions(
  elementResolver: ElementResolver
): Assertions & Interactions {
  return {
    ...makeAssertions(elementResolver),
    ...makeAssertionsNot(elementResolver),
    ...makeInteractions(elementResolver),
  };
}

const makeDriver = (): Driver => ({
  goTo(path) {
    return () => {
      cy.visit(path);
    };
  },
  findByLabelText(labelText: string) {
    return makeAssertionsInteractions(() => cy.findByLabelText(labelText));
  },
  findByRole(role, { name }) {
    return makeAssertionsInteractions(() => cy.findByRole(role, { name }));
  },
  findByText(text) {
    return makeAssertionsInteractions(() => cy.findByText(text));
  },
  findAllByText(text) {
    return makeAssertionsInteractions(() => cy.findAllByText(text));
  },
  queryByText(text) {
    return makeAssertionsNot(() => cy.findByText(text));
  },
  mockEndpoint,
  setUp(factory) {
    return factory(this);
  },
  getRouter() {
    return makePathAssertions();
  }
});

function wrapItCallback(func: ItCallback) {
  return () => {
    const driver = makeDriver();
    const steps = func({ driver });

    steps.forEach((step) => {
      const nestedCallback = step({ driver });
      if (typeof nestedCallback === "function") nestedCallback();
    });
  };
}

const it = (description: string, func: ItCallback) =>
  itCypress(description, wrapItCallback(func));

export { it };
