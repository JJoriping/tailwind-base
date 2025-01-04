import test from "node:test";
import assert from "assert";
import buildTailwindBaseTransformer from "./transformer.js";

test("buildTailwindBaseTransformer()", () => {
  const transformer = buildTailwindBaseTransformer();

  assert.strictEqual(
    transformer("const test = [{ foo: \"border\", bar: Number, className: String(\"block\") }];"),
    'const test = ["foo:border ", bar: Number, className: String("block")];'
  );
});