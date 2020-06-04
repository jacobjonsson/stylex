import { transform } from '@babel/core';
import { createBabelPlugin } from '../BabelPlugin';
import { StyleSheet } from '../StyleSheet';

it('should transform a simple stylex case', () => {
    const stylesheet = new StyleSheet();
    const code = `
        import { stylex, cx } from '@jacobjonsson/stylex';

        const root = stylex\`
            display: block;
        \`;

        function App() {
            return <div className={cx(root)} />
        }
    `;

    const { code: transformedCode } = transform(code, {
        plugins: [createBabelPlugin({ stylesheet })],
    });

    expect(transformedCode).toMatchInlineSnapshot(`
        "import { stylex, cx } from '@jacobjonsson/stylex';
        const root = \\"sx_16tz64g\\";

        function App() {
          return <div className={cx(root)} />;
        }"
    `);
});

it('should transform a simple generator case', () => {
    const stylesheet = new StyleSheet();
    const code = `
        import { generateResponsiveStyles, resolveResponsiveClass, cx } from '@jacobjonsson/stylex';

        const paddingTopStyleRefs = generateResponsiveStyles('padding-top', {
            base: '4px',
            xs: '8px',
            small: '12px',
            medium: '16px',
            large: '24px',
        });

        function App() {
            return (
                <div
                    className={cx(resolveResponsiveClass(paddingTopStyleRefs, 'small'))}
                />
            )
        }
    `;

    const { code: transformedCode } = transform(code, {
        plugins: [createBabelPlugin({ stylesheet })],
    });

    expect(transformedCode).toMatchInlineSnapshot(`
        "import { generateResponsiveStyles, resolveResponsiveClass, cx } from '@jacobjonsson/stylex';
        const paddingTopStyleRefs = {
          \\"base\\": \\"sx_1jjwix0\\",
          \\"md:base\\": \\"sx_pqegot\\",
          \\"lg:base\\": \\"sx_8050uj\\",
          \\"xs\\": \\"sx_vpghpc\\",
          \\"md:xs\\": \\"sx_jsokxd\\",
          \\"lg:xs\\": \\"sx_rs28hb\\",
          \\"small\\": \\"sx_1pzrub\\",
          \\"md:small\\": \\"sx_1ns6hw6\\",
          \\"lg:small\\": \\"sx_1xyqd0a\\",
          \\"medium\\": \\"sx_1i4aavz\\",
          \\"md:medium\\": \\"sx_ywbj4q\\",
          \\"lg:medium\\": \\"sx_1wrdu26\\",
          \\"large\\": \\"sx_1h6wzy6\\",
          \\"md:large\\": \\"sx_1d04ymj\\",
          \\"lg:large\\": \\"sx_jevsh5\\"
        };

        function App() {
          return <div className={cx(resolveResponsiveClass(paddingTopStyleRefs, 'small'))} />;
        }"
    `);
});

it.only('should transform a generate call with theme property', () => {
    const stylesheet = new StyleSheet();
    const theme = {
        spacing: {
            base: '4px',
            xs: '8px',
            small: '12px',
            medium: '16px',
            large: '24px',
        },
    };
    const code = `
        import { generateResponsiveStyles, resolveResponsiveClass, cx } from '@jacobjonsson/stylex';

        const paddingTopStyleRefs = generateResponsiveStyles('padding-top', 'spacing');

        function App() {
            return (
                <div
                    className={cx(resolveResponsiveClass(paddingTopStyleRefs, 'small'))}
                />
            )
        }
    `;

    const { code: transformedCode } = transform(code, {
        plugins: [createBabelPlugin({ stylesheet, theme })],
    });

    expect(transformedCode).toMatchInlineSnapshot(`
        "import { generateResponsiveStyles, resolveResponsiveClass, cx } from '@jacobjonsson/stylex';
        const paddingTopStyleRefs = {
          \\"base\\": \\"sx_1jjwix0\\",
          \\"md:base\\": \\"sx_pqegot\\",
          \\"lg:base\\": \\"sx_8050uj\\",
          \\"xs\\": \\"sx_vpghpc\\",
          \\"md:xs\\": \\"sx_jsokxd\\",
          \\"lg:xs\\": \\"sx_rs28hb\\",
          \\"small\\": \\"sx_1pzrub\\",
          \\"md:small\\": \\"sx_1ns6hw6\\",
          \\"lg:small\\": \\"sx_1xyqd0a\\",
          \\"medium\\": \\"sx_1i4aavz\\",
          \\"md:medium\\": \\"sx_ywbj4q\\",
          \\"lg:medium\\": \\"sx_1wrdu26\\",
          \\"large\\": \\"sx_1h6wzy6\\",
          \\"md:large\\": \\"sx_1d04ymj\\",
          \\"lg:large\\": \\"sx_jevsh5\\"
        };

        function App() {
          return <div className={cx(resolveResponsiveClass(paddingTopStyleRefs, 'small'))} />;
        }"
    `);
});
