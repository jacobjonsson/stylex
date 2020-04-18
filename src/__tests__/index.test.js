import { transform } from '@babel/core';

let transpile;
let styleSheet;

beforeEach(() => {
  jest.resetModules();
  let plugin = require('../babel');
  styleSheet = require('../stylesheet').styleSheet;

  transpile = (code) => {
    return transform(code, {
      plugins: [plugin],
      babelrc: false,
    });
  };
});

it('should handle a simple example', () => {
  const input = `
    import stylex from 'stylex';

    const base = stylex.create\`
      background-color: red; 
    \`;

    export default function Component() {
      return (
        <div className={stylex.resolve(base)} />
      );
    }
  `;

  const { code } = transpile(input);
  expect(code).toMatchInlineSnapshot(`
    "import stylex from 'stylex';
    const base = [\\"x1t4qh4s\\"];
    export default function Component() {
      return <div className={\\"x1t4qh4s\\"} />;
    }"
  `);

  expect(styleSheet.extractCSS()).toMatchInlineSnapshot(`".x1t4qh4s {background-color: red;}"`);
});

it('should handle media queries', () => {
  const input = `
    import stylex from 'stylex';

    const base = stylex.create\`
      background-color: red;

      @media (min-width: 768px) {
        background-color: green;
      }
    \`;

    export default function Component() {
      return (
        <div className={stylex.resolve(base)} />
      );
    }
  `;

  const { code } = transpile(input);
  expect(code).toMatchInlineSnapshot(`
    "import stylex from 'stylex';
    const base = [\\"x1t4qh4s\\", \\"x15bxnfn\\"];
    export default function Component() {
      return <div className={\\"x1t4qh4s x15bxnfn\\"} />;
    }"
  `);

  expect(styleSheet.extractCSS()).toMatchInlineSnapshot(`
    ".x1t4qh4s {background-color: red;}
    @media (min-width:768px) {.x15bxnfn {background-color: green;}}"
  `);
});

it('should handle nested selectors', () => {
  const input = `
    import stylex from 'stylex';

    const base = stylex.create\`
      background-color: red;

      & > input {
        line-height: normal;
      }
    \`;

    export default function Component() {
      return (
        <div className={stylex.resolve(base)} />
      );
    }
  `;

  const { code } = transpile(input);
  expect(code).toMatchInlineSnapshot(`
    "import stylex from 'stylex';
    const base = [\\"x1t4qh4s\\", \\"x1iph7ta\\"];
    export default function Component() {
      return <div className={\\"x1t4qh4s x1iph7ta\\"} />;
    }"
  `);

  expect(styleSheet.extractCSS()).toMatchInlineSnapshot(`
    ".x1t4qh4s {background-color: red;}
    .x1iph7ta> input {line-height: normal;}"
  `);
});

it('should handle conditionals', () => {
  const input = `
    import stylex from 'stylex';

    const base = stylex.create\`
      background-color: red;
    \`;

    const blue = stylex.create\`
      background-color: blue;
    \`;

    export default function Component(props) {
      return (
        <div className={stylex.resolve(base, props.blue && blue)} />
      );
    }
  `;

  const { code } = transpile(input);
  expect(code).toMatchInlineSnapshot(`
    "import stylex from 'stylex';
    const base = [\\"x1t4qh4s\\"];
    const blue = [\\"x142c91x\\"];
    export default function Component(props) {
      return <div className={\\"x1t4qh4s\\" + \\" \\" + (props.blue ? \\"x142c91x\\" : \\"\\")} />;
    }"
  `);

  expect(styleSheet.extractCSS()).toMatchInlineSnapshot(`
    ".x1t4qh4s {background-color: red;}
    .x142c91x {background-color: blue;}"
  `);
});
