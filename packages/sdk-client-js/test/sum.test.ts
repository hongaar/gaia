import assert from "node:assert";
import test from "node:test";
import { sum } from "../src/sum.js";

test("adds 1 + 2 to equal 3", () => {
  assert.strictEqual(sum(1, 2), 3);
});
