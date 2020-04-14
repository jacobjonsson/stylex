import parse from "../parse";

it("should handle a simple case", () => {
  const result = parse({ fontSize: 12 });
  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "className": "xadsd7g",
        "css": ".xadsd7g {font-size: 12;}",
      },
    ]
  `);
});

it("should handle media queries", () => {
  const result = parse({
    fontSize: 12,
    "@media (min-width: 768px)": { width: "320px" },
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "className": "xadsd7g",
        "css": ".xadsd7g {font-size: 12;}",
      },
      Object {
        "className": "xiyxedt",
        "css": "@media (min-width: 768px): {.xiyxedt {width: 320px;}}",
      },
    ]
  `);
});

it("should handle nested selectors", () => {
  const result = parse({
    fontSize: 12,
    "& > p": {
      fontSize: 12,
    },
    "&:hover": {
      fontSize: 14,
    },
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "className": "xadsd7g",
        "css": ".xadsd7g {font-size: 12;}",
      },
      Object {
        "className": "x1cflrwy",
        "css": ".x1cflrwy > p {font-size: 12;}",
      },
      Object {
        "className": "x1gl39q6",
        "css": ".x1gl39q6:hover {font-size: 14;}",
      },
    ]
  `);
});

it("should handle psuedo selectors", () => {
  const result = parse({
    fontSize: 12,
    "&:hover": {
      fontSize: 14,
    },
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "className": "xadsd7g",
        "css": ".xadsd7g {font-size: 12;}",
      },
      Object {
        "className": "x1gl39q6",
        "css": ".x1gl39q6:hover {font-size: 14;}",
      },
    ]
  `);
});
