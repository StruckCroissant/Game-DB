import userEvent from "@testing-library/user-event";
import { mockServer } from "./mock-server";
import { makeMockEndpoint } from "./mock-endpoint";

export { render, screen } from "@testing-library/vue";
export { expect, it } from "vitest";
export { userEvent };

export const mockEndpoint = makeMockEndpoint({ mockServer });
