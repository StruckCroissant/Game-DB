import flushP from "flush-promises";
import { vi } from "vitest";
import { render } from "@testing-library/vue";
import type { RenderOptions, RenderResult } from "@testing-library/vue";
import type { Component } from "vue";

export async function flushPromises() {
  await flushP();
  vi.advanceTimersByTime(5);
  await flushP();
}

export function mountWithHoc(
  component: Component,
  options: RenderOptions & { template: string }
): RenderResult {
  const container = new HTMLElement();
  container.innerHTML = options.template;

  return render(component, options);
}
