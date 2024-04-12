import { createApp, provide } from "vue";
import { FormContext, FormContextKey } from "vee-validate";
import type { App, Component, defineComponent } from "vue";
import { useForm } from "vee-validate";
import { InjectionKey } from "vue";
import { GenericObject } from "vee-validate";

type FormData = {
  validationSchema: Record<
    string,
    (...args: (object & string)[]) => string | boolean
  >;
};

export function getExtendedComponent(
  inputComponent: ReturnType<typeof defineComponent>,
  options: { mockFormData: FormData }
): Component {
  return {
    ...inputComponent,
    setup(props, ctx) {
      let result = {};

      if (options.mockFormData) {
        const useFormResult = useForm(options.mockFormData);
        provide(
          FormContextKey as InjectionKey<
            FormContext<GenericObject, GenericObject>
          >,
          useFormResult
        );
      }

      if (inputComponent.setup) {
        const setupResult = inputComponent.setup(props, ctx);
        result = { ...result, ...setupResult };
      }

      return result;
    },
  };
}

export function withSetup<T>(composable: () => T): {
  instance: T;
  app: App<Element>;
} {
  let result: T;
  const app = createApp({
    setup() {
      result = composable();
    },
    template: `<div></div>`,
  });
  app.mount(document.createElement("div"));
  return { instance: result, app };
}
