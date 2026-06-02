import { DEFAULT_TRANSFORMS } from "./transforms.js";

/**
 * Compile LiquidX syntax into standard Shopify Liquid.
 */
export function compile(input, { transforms = DEFAULT_TRANSFORMS } = {}) {
  const initial = String(input ?? "").replace(/\r\n/g, "\n");
  return transforms.reduce((output, transform) => transform(output), initial);
}

/**
 * Backward-compatible alias for existing callers.
 */
export function compileLiquid(input) {
  return compile(input);
}
