import type { FieldContext } from "vee-validate";

type InteractionEventGetter = (
  ctx: Required<Pick<FieldContext, "meta" | "errorMessage">>
) => string[];

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

export const modes: Record<string, InteractionEventGetter> = {
  passive: passive,
  lazy: lazy,
  aggressive: aggressive,
  eager: eager,
};
