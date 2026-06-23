import assert from "node:assert/strict";
import test from "node:test";
import { compile } from "../lib/compiler.js";
import { transformLxIf, transformMap } from "../lib/transforms.js";

test("transformLxIf compiles inline conditional", () => {
  const input = '{% lx-if product.available "In stock" "Sold out" %}';
  const output = transformLxIf(input);
  assert.equal(
    output,
    '{% if product.available %} In stock {% else %} Sold out {% endif %}'
  );
});

test("transformMap compiles object assign to case/when", () => {
  const input = '{% assign badges = { "new": "new.svg", "sale": "sale.svg" } %}';
  const output = transformMap(input);
  assert.match(output, /{% case badges %}/);
  assert.match(output, /{% when "new" %} new\.svg/);
  assert.match(output, /{% when "sale" %} sale\.svg/);
  assert.match(output, /{% endcase %}/);
});

test("compile runs full pipeline", () => {
  const input = [
    '{% assign x = { "A": "a.svg" } %}',
    '{% lx-if cart.item_count > 0 "Has items" "Empty" %}'
  ].join("\n");

  const output = compile(input);
  assert.match(output, /{% case x %}/);
  assert.match(output, /{% if cart\.item_count > 0 %}/);
});

test("unchanged when no LiquidX syntax present", () => {
  const input = "{% if product.available %}OK{% endif %}";
  assert.equal(compile(input), input);
});
