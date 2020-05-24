import { cssToObj } from '../cssToObj';

it('should parse css string', () => {
    const cssString = `
        background-color: red;
        margin-top: 10px;
        display: flex;

        &:hover {
            margin-top: 30px;
        }

        @media (min-width: 768px) {
            background-color: green;
        }
    `;

    const res = cssToObj(cssString);
    expect(res).toMatchInlineSnapshot(`
        Object {
          ":hover": Object {
            "margin-top": "30px",
          },
          "@media (min-width: 768px)": Object {
            "background-color": "green",
          },
          "background-color": "red",
          "display": "flex",
          "margin-top": "10px",
        }
    `);
});
