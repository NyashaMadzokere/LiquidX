# LiquidX Examples

Realistic Shopify theme snippets that show where LiquidX syntax helps, and what the compiler outputs.

## How to run

From the repo root:

```bash
liquidx ./examples/<file>.liquid
```

Output is written beside the source file as `<file>.compiled.liquid`.

Quick validation of all transforms:

```bash
node ./test/run.js
```

---

## Example index

| File | Theme context | LiquidX features | Standard Liquid also used |
|------|---------------|------------------|---------------------------|
| [`sample.liquid`](./sample.liquid) | Product card | Map/object assign, `lx-if` | `if/elsif`, filters (`money`, `asset_url`, `image_url`) |
| [`cart-drawer.liquid`](./cart-drawer.liquid) | Cart drawer | `lx-if` (free-shipping threshold) | `for` loop, `cart` object |
| [`product-badges.liquid`](./product-badges.liquid) | Product badges | Map/object assign, `lx-if` | `for` over tags, `asset_url` |
| [`collection-card.liquid`](./collection-card.liquid) | Collection tile | `lx-if` (empty vs populated) | `collection` object, `image_url` |
| [`variant-picker.liquid`](./variant-picker.liquid) | Variant selector | Map/object assign, `lx-if` per variant | `for` over variants, radio inputs |
| [`announcement-bar.liquid`](./announcement-bar.liquid) | Store banner | Map/object assign, `lx-if` (dismiss label) | Section `schema`, settings |
| [`order-status.liquid`](./order-status.liquid) | Order status page | Multiple `lx-if` (fulfillment, payment) | `order` object, `for` over line items |
| [`main-product.liquid`](./main-product.liquid) | Full product section | — (plain Liquid reference) | Large real-world section file |

---

## Feature cheat sheet

### Map/object assign

**Authoring syntax:**

```liquid
{% assign badgeIcons = { "new": "badge-new.svg", "sale": "badge-sale.svg" } %}
```

**Compiles to:**

```liquid
{% case badgeIcons %}
{% when "new" %} badge-new.svg
{% when "sale" %} badge-sale.svg
{% endcase %}
```

**Best for:** key → value lookups (badges, labels, promo copy, size names).

**See in:** `sample.liquid`, `product-badges.liquid`, `variant-picker.liquid`, `announcement-bar.liquid`

---

### `lx-if` shorthand

**Authoring syntax:**

```liquid
{% lx-if product.available "In stock" "Sold out" %}
```

**Compiles to:**

```liquid
{% if product.available %} In stock {% else %} Sold out {% endif %}
```

**Best for:** short inline UI text (stock, shipping, payment, empty states).

**See in:** `sample.liquid`, `cart-drawer.liquid`, `product-badges.liquid`, `collection-card.liquid`, `variant-picker.liquid`, `announcement-bar.liquid`, `order-status.liquid`

---

## Suggested learning path

1. Start with **`sample.liquid`** — smallest file, both features in one place.
2. Try **`cart-drawer.liquid`** and **`collection-card.liquid`** — single `lx-if` patterns.
3. Open **`product-badges.liquid`** and **`variant-picker.liquid`** — map + `lx-if` together.
4. Compare **`main-product.liquid`** vs its compiled output — note when plain Liquid has nothing to transform.

---

## Notes

- Edit **source** `*.liquid` files only; treat `*.compiled.liquid` as generated output.
- If a file has no LiquidX syntax, source and compiled output will look the same (see `main-product.liquid`).
- Compiled artifacts are gitignored by default (`*.compiled.liquid`).
