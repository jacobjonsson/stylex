import { createRule } from '../createRule';

it('should correctly create a simple rule', () => {
    expect(createRule({ className: 'a', property: 'margin-top', value: '10px' })).toEqual(
        '.a { margin-top: 10px; }',
    );
});

it('should correctly create a nested rule', () => {
    expect(
        createRule({
            className: 'a',
            property: 'margin-top',
            value: '10px',
            children: '> button',
        }),
    ).toEqual('.a > button { margin-top: 10px; }');
});

it('should correctly create a media query rule', () => {
    expect(
        createRule({
            className: 'a',
            property: 'margin-top',
            value: '10px',
            media: '@media (min-width: 768px)',
        }),
    ).toEqual('@media (min-width: 768px) { .a.a { margin-top: 10px; } }');
});

it('should correctly create a nested rule + media query rule', () => {
    expect(
        createRule({
            className: 'a',
            property: 'margin-top',
            value: '10px',
            children: 'button',
            media: '@media (min-width: 768px)',
        }),
    ).toEqual('@media (min-width: 768px) { .a.a button { margin-top: 10px; } }');
});

it('should correctly create pseudo selectors', () => {
    expect(
        createRule({ className: 'a', property: 'margin-top', value: '10px', children: ':hover' }),
    ).toEqual('.a:hover { margin-top: 10px; }');
});
