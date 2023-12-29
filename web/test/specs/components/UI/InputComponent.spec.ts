import { it } from "@game-db/application-test-driver";
import { Driver } from "test/types";


it("should do stuff", ({ driver }: { driver: Driver }) => [
  driver.goTo('/'),
  driver.findByText('test').shouldBeVisible(),
]);
