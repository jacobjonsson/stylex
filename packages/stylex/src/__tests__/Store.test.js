import { Store } from '../store';

it('should extract the correct css for a simple use case', async () => {
    const store = new Store();

    let classNames = store.create(`margin-top: 10px;`);
    expect(classNames).toMatchInlineSnapshot(`"x5xanau"`);

    let css = await store.extractCSS();
    expect(css).toMatchInlineSnapshot(`".x5xanau {margin-top: 10px;}"`);
});

it('should prefix css', async () => {
    const store = new Store();

    let classNames = store.create(`display: flex;`);
    expect(classNames).toMatchInlineSnapshot(`"x110k4so"`);

    let css = await store.extractCSS();
    expect(css).toMatchInlineSnapshot(`".x110k4so {display: flex;}"`);
});

it('should handle nested selectors', async () => {
    const store = new Store();

    let classNames = store.create(`
        display: flex;
        & > p {
            display: block;
        }
        @media (min-width: 768px) {
            display: block;
        }
    `);
    expect(classNames).toMatchInlineSnapshot(`"x110k4so x1lyhycu x1ug13u9"`);

    let css = await store.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".x110k4so {display: flex;}
        .x1lyhycu> p {display: block;}
        @media (min-width: 768px) {.x1ug13u9 {display: block;}}"
    `);
});

it('should handle pseudo selectors', async () => {
    const store = new Store();

    let classNames = store.create(`
        background-color: red;
        &:focus {
            background-color: blue;
        }
    `);
    expect(classNames).toMatchInlineSnapshot(`"x1t4qh4s x1msjykb"`);

    let css = await store.extractCSS();
    expect(css).toMatchInlineSnapshot(`
        ".x1t4qh4s {background-color: red;}
        .x1msjykb:focus {background-color: blue;}"
    `);
});

it('should handle media quries and place them at the bottom', async () => {
    const store = new Store();

    let classNames = store.create(`
        @media (min-width: 768px) {
            display: block;
        }
        display: flex;
    `);
    expect(classNames).toMatchInlineSnapshot(`"x110k4so x1ug13u9"`);

    let css = await store.extractCSS();
    expect(css).toMatchInlineSnapshot(
        `".x110k4so {display: flex;}@media (min-width: 768px) {.x1ug13u9 {display: block;}}"`,
    );
});
