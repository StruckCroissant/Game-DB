import type { FieldContext } from "vee-validate";

type InteractionEventGetter = (ctx: FieldContext) => string[];

// Validates on submit only
const passive: InteractionEventGetter = ({meta, errorMessage}) => [];

const lazy: InteractionEventGetter = ({ meta, errorMessage }) => {
  return ['change'];
};

const aggressive: InteractionEventGetter = ({meta, errorMessage}) => ['input'];

const eager: InteractionEventGetter = ({ meta, errorMessage }) => {
  if (errorMessage.value) {
    return ['input'];
  }

  return ['change'];
};

export const modes: Record<string, InteractionEventGetter> = {
  'passive': passive,
  'lazy': lazy,
  'aggressive': aggressive,
  'eager': eager,
};
