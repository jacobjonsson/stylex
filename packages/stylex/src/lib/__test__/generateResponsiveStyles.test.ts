import { generateResponsiveStyles } from '../generateResponsiveStyles';

it('should generate responsive space styles', () => {
    const res = generateResponsiveStyles('padding-top', {
        base: '4px',
        xs: '8px',
        small: '12px',
        medium: '16px',
        large: '20px',
        xl: '24px',
        '2xl': '32px',
    });

    expect(res.styleRefs).toMatchInlineSnapshot(`
        Object {
          "2xl": "sx_u39ho1",
          "base": "sx_1jjwix0",
          "large": "sx_ygzj0q",
          "lg:2xl": "sx_1152mn8",
          "lg:base": "sx_8050uj",
          "lg:large": "sx_4ujy5p",
          "lg:medium": "sx_1wrdu26",
          "lg:small": "sx_1xyqd0a",
          "lg:xl": "sx_jevsh5",
          "lg:xs": "sx_rs28hb",
          "md:2xl": "sx_xm2xfc",
          "md:base": "sx_pqegot",
          "md:large": "sx_1l7zof",
          "md:medium": "sx_ywbj4q",
          "md:small": "sx_1ns6hw6",
          "md:xl": "sx_1d04ymj",
          "md:xs": "sx_jsokxd",
          "medium": "sx_1i4aavz",
          "small": "sx_1pzrub",
          "xl": "sx_1h6wzy6",
          "xs": "sx_vpghpc",
        }
    `);
    expect(res.rules).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "sx_1jjwix0",
            "css": ".sx_1jjwix0 { padding-top: 4px; }",
          },
          Object {
            "className": "sx_vpghpc",
            "css": ".sx_vpghpc { padding-top: 8px; }",
          },
          Object {
            "className": "sx_1pzrub",
            "css": ".sx_1pzrub { padding-top: 12px; }",
          },
          Object {
            "className": "sx_1i4aavz",
            "css": ".sx_1i4aavz { padding-top: 16px; }",
          },
          Object {
            "className": "sx_ygzj0q",
            "css": ".sx_ygzj0q { padding-top: 20px; }",
          },
          Object {
            "className": "sx_1h6wzy6",
            "css": ".sx_1h6wzy6 { padding-top: 24px; }",
          },
          Object {
            "className": "sx_u39ho1",
            "css": ".sx_u39ho1 { padding-top: 32px; }",
          },
          Object {
            "className": "sx_pqegot",
            "css": "@media (min-width: 768px) { .sx_pqegot.sx_pqegot { padding-top: 4px; } }",
          },
          Object {
            "className": "sx_jsokxd",
            "css": "@media (min-width: 768px) { .sx_jsokxd.sx_jsokxd { padding-top: 8px; } }",
          },
          Object {
            "className": "sx_1ns6hw6",
            "css": "@media (min-width: 768px) { .sx_1ns6hw6.sx_1ns6hw6 { padding-top: 12px; } }",
          },
          Object {
            "className": "sx_ywbj4q",
            "css": "@media (min-width: 768px) { .sx_ywbj4q.sx_ywbj4q { padding-top: 16px; } }",
          },
          Object {
            "className": "sx_1l7zof",
            "css": "@media (min-width: 768px) { .sx_1l7zof.sx_1l7zof { padding-top: 20px; } }",
          },
          Object {
            "className": "sx_1d04ymj",
            "css": "@media (min-width: 768px) { .sx_1d04ymj.sx_1d04ymj { padding-top: 24px; } }",
          },
          Object {
            "className": "sx_xm2xfc",
            "css": "@media (min-width: 768px) { .sx_xm2xfc.sx_xm2xfc { padding-top: 32px; } }",
          },
          Object {
            "className": "sx_8050uj",
            "css": "@media (min-width: 1024px) { .sx_8050uj.sx_8050uj { padding-top: 4px; } }",
          },
          Object {
            "className": "sx_rs28hb",
            "css": "@media (min-width: 1024px) { .sx_rs28hb.sx_rs28hb { padding-top: 8px; } }",
          },
          Object {
            "className": "sx_1xyqd0a",
            "css": "@media (min-width: 1024px) { .sx_1xyqd0a.sx_1xyqd0a { padding-top: 12px; } }",
          },
          Object {
            "className": "sx_1wrdu26",
            "css": "@media (min-width: 1024px) { .sx_1wrdu26.sx_1wrdu26 { padding-top: 16px; } }",
          },
          Object {
            "className": "sx_4ujy5p",
            "css": "@media (min-width: 1024px) { .sx_4ujy5p.sx_4ujy5p { padding-top: 20px; } }",
          },
          Object {
            "className": "sx_jevsh5",
            "css": "@media (min-width: 1024px) { .sx_jevsh5.sx_jevsh5 { padding-top: 24px; } }",
          },
          Object {
            "className": "sx_1152mn8",
            "css": "@media (min-width: 1024px) { .sx_1152mn8.sx_1152mn8 { padding-top: 32px; } }",
          },
        ]
    `);
});

it('should generate responsive color rules', () => {
    const res = generateResponsiveStyles('background-color', {
        red: 'red',
        black: '#000',
        white: '#fff',
    });

    expect(res.styleRefs).toMatchInlineSnapshot(`
        Object {
          "black": "sx_zoeueu",
          "lg:black": "sx_l59k1d",
          "lg:red": "sx_1masrmb",
          "lg:white": "sx_1ix95vb",
          "md:black": "sx_bl4qlv",
          "md:red": "sx_18fbaed",
          "md:white": "sx_uwk8k9",
          "red": "sx_x09p24",
          "white": "sx_1cxdipk",
        }
    `);
    expect(res.rules).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "sx_x09p24",
            "css": ".sx_x09p24 { background-color: red; }",
          },
          Object {
            "className": "sx_zoeueu",
            "css": ".sx_zoeueu { background-color: #000; }",
          },
          Object {
            "className": "sx_1cxdipk",
            "css": ".sx_1cxdipk { background-color: #fff; }",
          },
          Object {
            "className": "sx_18fbaed",
            "css": "@media (min-width: 768px) { .sx_18fbaed.sx_18fbaed { background-color: red; } }",
          },
          Object {
            "className": "sx_bl4qlv",
            "css": "@media (min-width: 768px) { .sx_bl4qlv.sx_bl4qlv { background-color: #000; } }",
          },
          Object {
            "className": "sx_uwk8k9",
            "css": "@media (min-width: 768px) { .sx_uwk8k9.sx_uwk8k9 { background-color: #fff; } }",
          },
          Object {
            "className": "sx_1masrmb",
            "css": "@media (min-width: 1024px) { .sx_1masrmb.sx_1masrmb { background-color: red; } }",
          },
          Object {
            "className": "sx_l59k1d",
            "css": "@media (min-width: 1024px) { .sx_l59k1d.sx_l59k1d { background-color: #000; } }",
          },
          Object {
            "className": "sx_1ix95vb",
            "css": "@media (min-width: 1024px) { .sx_1ix95vb.sx_1ix95vb { background-color: #fff; } }",
          },
        ]
    `);
});
