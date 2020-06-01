import { createRule } from '../createRule';

it('should correctly create a simple rule', () => {
    expect(createRule('a', 'margin-top', '10px')).toEqual('.a { margin-top: 10px; }');
});

it('should correctly create a nested rule', () => {
    expect(createRule('a', 'margin-top', '10px', '> button')).toEqual(
        '.a > button { margin-top: 10px; }',
    );
});

it('should correctly create a media query rule', () => {
    expect(createRule('a', 'margin-top', '10px', '', '@media (min-width: 768px)')).toEqual(
        '@media (min-width: 768px) { .a.a { margin-top: 10px; } }',
    );
});

it('should correctly create a nested rule + media query rule', () => {
    expect(createRule('a', 'margin-top', '10px', 'button', '@media (min-width: 768px)')).toEqual(
        '@media (min-width: 768px) { .a.a button { margin-top: 10px; } }',
    );
});
