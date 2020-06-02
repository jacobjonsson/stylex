import { transformCSSString } from '../transformCSSString';

it('should transform a simple case', () => {
    const css = `
        display: block;
        margin-top: 100px;
    `;

    const res = transformCSSString(css);

    expect(res).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "sx_16tz64g",
            "css": ".sx_16tz64g { display: block; }",
          },
          Object {
            "className": "sx_iabo4i",
            "css": ".sx_iabo4i { margin-top: 100px; }",
          },
        ]
    `);
});

it('should transform a media query', () => {
    const css = `
        margin-top: 100px;

        @media (min-width: 1024px) {
            margin-top: 200px;
        }
    `;

    const res = transformCSSString(css);

    expect(res).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "sx_iabo4i",
            "css": ".sx_iabo4i { margin-top: 100px; }",
          },
          Object {
            "className": "sx_17ufqxk",
            "css": "@media (min-width: 1024px) { .sx_17ufqxk.sx_17ufqxk { margin-top: 200px; } }",
          },
        ]
    `);
});

it('should transform pseudo selectors', () => {
    const css = `
        background-color: blue;

        &:hover {
            background-color: red;
        }
    `;

    const res = transformCSSString(css);
    expect(res).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "sx_142c91x",
            "css": ".sx_142c91x { background-color: blue; }",
          },
          Object {
            "className": "sx_hnhgvo",
            "css": ".sx_hnhgvo:hover { background-color: red; }",
          },
        ]
    `);
});

it('should transform nested selectors', () => {
    const css = `
        background-color: blue;

        & > button {
            background-color: red;
        }
    `;

    const res = transformCSSString(css);
    expect(res).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "sx_142c91x",
            "css": ".sx_142c91x { background-color: blue; }",
          },
          Object {
            "className": "sx_btucge",
            "css": ".sx_btucge  > button { background-color: red; }",
          },
        ]
    `);
});
