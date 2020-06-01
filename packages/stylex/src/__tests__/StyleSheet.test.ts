import { StyleSheet } from '../StyleSheet';

it('should extract the correct css for a simple use case', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`margin-top: 10px;`);
    expect(classNames).toMatchInlineSnapshot(`"sx_7h5m42"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`".sx_7h5m42 { margin-top: 10px; }"`);
});

it('should prefix css', async () => {
    const stylesheet = new StyleSheet();

    let classNames = stylesheet.addCSS(`display: flex;`);
    expect(classNames).toMatchInlineSnapshot(`"sx_bmtag4"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`".sx_bmtag4 { display: flex; }"`);
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
    expect(classNames).toMatchInlineSnapshot(`"sx_bmtag4 sx_1bo7ynu sx_3t7k31"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".sx_bmtag4 { display: flex; }
        .sx_1bo7ynu undefined> p { display: block; }
        @media (min-width: 768px) { .sx_3t7k31.sx_3t7k31 { display: block; } }"
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
    expect(classNames).toMatchInlineSnapshot(`"sx_14kbzww sx_1x1cqep"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".sx_14kbzww { background-color: red; }
        .sx_1x1cqep undefined:focus { background-color: blue; }"
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
    expect(classNames).toMatchInlineSnapshot(`"sx_bmtag4 sx_3t7k31"`);

    let css = await stylesheet.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".sx_bmtag4 { display: flex; }
        @media (min-width: 768px) { .sx_3t7k31.sx_3t7k31 { display: block; } }"
    `);
});
