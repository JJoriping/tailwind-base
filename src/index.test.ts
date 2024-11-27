import test from "node:test";
import assert from "assert";
// @ts-expect-error
import tailwindBase from "../res/tailwind-base.js";
import { loadTailwindBase } from "./index.js";

const twBase = loadTailwindBase(tailwindBase);
const c = twBase.merge.bind(twBase);

test("c()", () => {
  assert.strictEqual(c("border-b-4 border-b-2"), 'border-b-2');
  assert.strictEqual(c("border-b-4 border-b"), 'border-b');

  assert.strictEqual(c("m-1", [ "p-1", [ "p-2", [ "p-3" ], "m-2" ] ]), 'p-3 m-2');
});