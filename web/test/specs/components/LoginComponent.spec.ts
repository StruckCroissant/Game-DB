import { it } from "@game-db/application-test-utils";
import type { Driver } from "../../types";

it("should do stuff", ({ driver }: { driver: Driver }) => [
  driver.goTo("/login"),
  driver.findByText("Forgot password?").shouldBeVisible(),
  driver.findByText("Remember me").shouldBeVisible(),
  driver.findByText("Don't have an account?").shouldBeVisible(),
]);
