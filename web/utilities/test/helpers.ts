import { flushPromises as flushP } from "@vue/test-utils";
import { vi } from "vitest";
import { render } from "@testing-library/vue";
import type { RenderOptions, RenderResult } from "@testing-library/vue";
import type { Component } from "vue";

export async function flushPromises() {
  await flushP();
  vi.advanceTimersByTime(5);
  await flushP();
}
