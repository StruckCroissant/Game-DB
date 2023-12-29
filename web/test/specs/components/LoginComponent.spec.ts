import { it } from "@game-db/application-test-driver";
import { Driver } from "test/types";

it("should do stuff", ({ driver }: { driver: Driver }) => [
  driver.goTo("/"),
  driver.findByRole("button").click(),
  driver.findByText("Remember me").shouldBeVisible(),
  driver.findByText("Forgot password?").shouldBeVisible(),
  driver.findByText("Don't have an account?").shouldBeVisible(),
  driver.findByRole("link", { name: "forgotPassword" }).click(),
]);
