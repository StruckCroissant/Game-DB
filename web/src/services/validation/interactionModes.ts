import type { FieldContext } from "vee-validate";

type InteractionEventGetter = (
  ctx: Required<Pick<FieldContext, "meta" | "errorMessage">>
) => string[];

export type InteractionTypes = "passive" | "lazy" | "aggressive" | "eager";

// Validates on submit only
const passive: InteractionEventGetter = () => [];

const lazy: InteractionEventGetter = () => {
  return ["change"];
};

const aggressive: InteractionEventGetter = () => ["input"];

const eager: InteractionEventGetter = ({ errorMessage }) => {
  if (errorMessage.value) {
    return ["input"];
  }

  return ["change"];
};

export const modes: Record<InteractionTypes, InteractionEventGetter> = {
  passive: passive,
  lazy: lazy,
  aggressive: aggressive,
  eager: eager,
};
