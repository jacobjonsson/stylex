import { transform } from '@babel/core';
import plugin from '../babel';

function transpile(code) {
    return transform(code, {
        plugins: [plugin],
        babelrc: false,
    });
}

it('should handle a simple example', () => {
    const input = `
    import {stylex, cx} from 'stylex';

    const base = stylex\`
      background-color: red; 
    \`;

    export default function Component() {
      return (
        <div className={cx(base)} />
      );
    }
  `;

    const { code } = transpile(input);
    expect(code).toMatchInlineSnapshot(`
        "import { stylex, cx } from 'stylex';
        const base = [\\"x1t4qh4s\\"];
        export default function Component() {
          return <div className={cx(base)} />;
        }"
    `);
});

it('should handle media queries', () => {
    const input = `
    import {stylex, cx} from 'stylex';

    const base = stylex\`
      background-color: red;

      @media (min-width: 768px) {
        background-color: green;
      }
    \`;

    export default function Component() {
      return (
        <div className={cx(base)} />
      );
    }
  `;

    const { code } = transpile(input);
    expect(code).toMatchInlineSnapshot(`
        "import { stylex, cx } from 'stylex';
        const base = [\\"x1t4qh4s\\", \\"x15bxnfn\\"];
        export default function Component() {
          return <div className={cx(base)} />;
        }"
    `);
});

it('should handle nested selectors', () => {
    const input = `
    import {stylex, cx} from 'stylex';

    const base = stylex\`
      background-color: red;

      & > input {
        line-height: normal;
      }
    \`;

    export default function Component() {
      return (
        <div className={cx(base)} />
      );
    }
  `;

    const { code } = transpile(input);
    expect(code).toMatchInlineSnapshot(`
        "import { stylex, cx } from 'stylex';
        const base = [\\"x1t4qh4s\\", \\"x1iph7ta\\"];
        export default function Component() {
          return <div className={cx(base)} />;
        }"
    `);
});

it('should handle conditionals', () => {
    const input = `
    import {stylex, cx} from 'stylex';

    const base = stylex\`
      background-color: red;
    \`;

    const blue = stylex\`
      background-color: blue;
    \`;

    export default function Component(props) {
      return (
        <div className={cx(base, props.blue && blue)} />
      );
    }
  `;

    const { code } = transpile(input);
    expect(code).toMatchInlineSnapshot(`
        "import { stylex, cx } from 'stylex';
        const base = [\\"x1t4qh4s\\"];
        const blue = [\\"x142c91x\\"];
        export default function Component(props) {
          return <div className={cx(base, props.blue && blue)} />;
        }"
    `);
});
