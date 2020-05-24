import { hyphenate } from '../hyphenate';

it.each`
    input                | output
    ${'marginTop'}       | ${'margin-top'}
    ${'backgroundColor'} | ${'background-color'}
`(`should convert $input to $output`, ({ input, output }) => {
    expect(hyphenate(input)).toEqual(output);
});
