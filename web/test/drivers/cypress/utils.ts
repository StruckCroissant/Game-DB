import { cy } from "local-cypress";
import { MockEndpointOptions } from "../../mock-endpoint";

const ENDPOINT_MOCKS_KEY = `__ENDPOINT_MOCKS__`;

export const mockEndpoint = (
  endpoint: string,
  options: MockEndpointOptions
) => {
  cy.window().then(({ localStorage, mockEndpoint: windowMockEndpoint }) => {
    // Immediately mock endpoint if possible.
    if (windowMockEndpoint) {
      windowMockEndpoint(endpoint, options);
    }

    // Store mocks in Local Storage so they're available after a reload.
    const mocksRaw = localStorage.getItem(ENDPOINT_MOCKS_KEY);
    const mocks = mocksRaw ? JSON.parse(mocksRaw) : [];

    localStorage.setItem(
      ENDPOINT_MOCKS_KEY,
      JSON.stringify([
        ...mocks,
        {
          endpoint,
          options,
        },
      ])
    );
  });
};
