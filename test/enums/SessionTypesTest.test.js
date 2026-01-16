import { expect, test } from "vitest";
import { SESSION_TYPES, isFocus } from "../../src/enums/SessionTypes";

test("test", () => {
  let test = isFocus(SESSION_TYPES.FOCUS);
  expect(test).toBe(true);
});
