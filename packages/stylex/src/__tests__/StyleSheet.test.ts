import { StyleSheet } from '../StyleSheet';

it('should extract the correct css for a simple use case', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`margin-top: 10px;`);
    expect(classNames).toMatchInlineSnapshot(`"sx_5xanau"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`".sx_5xanau { margin-top: 10px; }"`);
});

it('should prefix css', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`display: flex;`);
    expect(classNames).toMatchInlineSnapshot(`"sx_110k4so"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`".sx_110k4so { display: flex; }"`);
});

it('should handle nested selectors', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`
        display: flex;
        & > p {
            display: block;
        }
        @media (min-width: 768px) {
            display: block;
        }
    `);
    expect(classNames).toMatchInlineSnapshot(`"sx_110k4so sx_1guhpqm sx_1ug13u9"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".sx_110k4so { display: flex; }
        .sx_1guhpqm  > p { display: block; }
        @media (min-width: 768px) { .sx_1ug13u9.sx_1ug13u9 { display: block; } }"
    `);
});

it('should handle pseudo selectors', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`
        background-color: red;
        &:focus {
            background-color: blue;
        }
    `);
    expect(classNames).toMatchInlineSnapshot(`"sx_1t4qh4s sx_1msjykb"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".sx_1t4qh4s { background-color: red; }
        .sx_1msjykb:focus { background-color: blue; }"
    `);
});

it('should handle media quries and place them at the bottom', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`
        @media (min-width: 768px) {
            display: block;
        }
        display: flex;
    `);
    expect(classNames).toMatchInlineSnapshot(`"sx_110k4so sx_1ug13u9"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".sx_110k4so { display: flex; }
        @media (min-width: 768px) { .sx_1ug13u9.sx_1ug13u9 { display: block; } }"
    `);
});
