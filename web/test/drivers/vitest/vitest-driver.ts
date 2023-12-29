import { expect, it as itVitest } from "vitest";
import { screen, waitForElementToBeRemoved } from "@testing-library/dom";
import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";

import type {
  Assertions,
  AssertionsNot,
  Driver,
  Interactions,
  ItCallback,
} from "../../types";
import { mount } from "../../../src/mount";
import { makeRouter } from "../../../src/router/index";
import { mockEndpoint } from "../../utils";
import { createPinia } from "pinia";
import { App } from "vue";

type ElementResolver = () => Promise<HTMLElement | HTMLElement[]>;

type MockHandle = {
  endpoint: string;
  options: {
    httpVerb: string;
    status: number;
  };
  hasBeenInvoked: boolean;
};

function toArray<Type>(maybeArray: Type | Type[]) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

function makeAssertions(elementResolver: ElementResolver): Assertions {
  return {
    shouldBeVisible: () => async () => {
      // TODO add types for this expect
      expect(await elementResolver()).toBeVisible();
    },
    shouldHaveAttribute: (attribute, value) => async () => {
      const elements = toArray<HTMLElement>(await elementResolver());

      // eslint-disable-next-line no-restricted-syntax
      for (const element of elements) {
        if (value) {
          expect(element.getAttribute(attribute)).toMatch(value);
        } else {
          expect(element.getAttribute(attribute)).toBeTruthy();
        }
      }
    },
  };
}

function makeAssertionsNot(
  elementResolver: () => Promise<HTMLElement | null>
): AssertionsNot {
  return {
    shouldNotBeVisible: () => async () => {
      expect(await elementResolver()).toBeFalsy();
    },
    shouldNotExist: () => async () => {
      const element = await elementResolver();
      if (element) {
        try {
          await waitForElementToBeRemoved(element);
        } catch (error) {
          throw new Error("Expected element to not exist but it still exists!");
        }
      }
    },
  };
}

function makeInteractions(
  elementResolver: ElementResolver,
  { user }: { user: UserEvent }
): Interactions {
  return {
    check: () => async () => {
      const elements = toArray<HTMLElement>(await elementResolver());
      for (const element of elements) {
        await user.click(element);
      }
    },
    click: () => async () => {
      const elements = toArray<HTMLElement>(await elementResolver());
      for (const element of elements) {
        await user.click(element);
      }
    },
    type: (text) => async () => {
      const elements = toArray<HTMLElement>(await elementResolver());
      for (const element of elements) {
        await user.type(element, text);
      }
    },
  };
}

function makeAssertionsInteractions(
  elementResolver: ElementResolver,
  { user }: { user: UserEvent }
): Assertions & Interactions {
  return {
    ...makeAssertions(elementResolver),
    ...makeInteractions(elementResolver, { user }),
  };
}

const makeDriver = ({ user }: { user: UserEvent }): Driver => ({
  goTo(path) {
    return async () => {
      const pinia = createPinia();
      const router = makeRouter();
      try {
        await router.push(path);
      } catch (error) {
        // Ignore redirection error.
        if (
          error instanceof Error &&
          error.message.includes("Redirected when going from")
        ) {
          return;
        }

        throw error;
      }

      document.body.innerHTML = '<div id="app"></div>';
      mount({ router, pinia });
    };
  },
  findByLabelText(text) {
    return makeAssertionsInteractions(() => screen.findByLabelText(text), {
      user,
    });
  },
  findByRole(role, { name } = {}) {
    return makeAssertionsInteractions(() => screen.findByRole(role, { name }), {
      user,
    });
  },
  findByText(text) {
    return makeAssertions(() => screen.findByText(text));
  },
  findAllByText(text) {
    return makeAssertions(() => screen.findAllByText(text));
  },
  mockEndpoint,
  setUp(factory) {
    return factory(this);
  },
  queryByText(text) {
    return makeAssertionsNot(async () => screen.queryByText(text));
  },
});

function wrapItCallback(func: ItCallback) {
  return async () => {
    const context: {
      mockHandles: Set<MockHandle>;
      user: UserEvent;
    } = {
      mockHandles: new Set(),
      user: userEvent.setup(),
    };
    const driver = makeDriver(context);
    const steps = func({ driver });
    for (const step of steps) {
      const nestedCallback = await step({ driver });
      // Step definitions return another callback.
      if (typeof nestedCallback === `function`) await nestedCallback();
    }
    context.mockHandles.forEach((handle) => {
      if (handle.hasBeenInvoked) return;
      throw new Error(
        `You mocked an endpoint that you did not use in the test! ${JSON.stringify(
          handle
        )}`
      );
    });
  };
}

const it = (description: string, func: ItCallback) =>
  itVitest(description, wrapItCallback(func));
it.only = (description: string, func: ItCallback) =>
  itVitest.only(description, wrapItCallback(func));

export { it };
