import { it } from "@game-db/application-test-utils";
import type { Driver } from "../../types";

const userResponseObject = {
  id: 78,
  username: "po",
  role: "USER",
  enabled: true,
  accountNonLocked: true,
  authorities: [
    {
      authority: "USER",
    },
  ],
  credentialsNonExpired: false,
  accountNonExpired: true,
};

it("Login page should be visible", ({ driver }: { driver: Driver }) => [
  driver.goTo("/login").doAction(),
  driver.findByText("Forgot password?").shouldBeVisible(),
  driver.findByText("Remember me").shouldBeVisible(),
  driver.findByText("Don't have an account?").shouldBeVisible(),
  driver.findByRole("button", { name: "Log in" }).shouldBeVisible(),
]);

it("Router should redirect base page to the login page", ({ driver }) => [
  driver.goTo("/").locationShouldEqual("/login"),
]);

it("Login should succeed", ({ driver }) => [
  () =>
    driver.mockEndpoint("http://localhost:9191/api/v1/login", {
      body: userResponseObject,
      status: 200,
      method: "post",
    }),
  driver.goTo("/login").doAction(),
  driver.findByRole("input", { name: "username" }).type("test"),
  driver.findByRole("input", { name: "password" }).type("test"),
  driver.findByRole("button", { name: "Log in" }).click(),
  driver.findByText("Success!").shouldBeVisible(),
]);
