import React from 'react';
import { generateResponsiveStyles, resolveResponsiveClass, cx } from '@jacobjonsson/stylex';

const paddingTopRefs = generateResponsiveStyles('padding-top', 'spacing');
const paddingRightRefs = generateResponsiveStyles('padding-right', 'spacing');
const paddingBottomRefs = generateResponsiveStyles('padding-bottom', 'spacing');
const paddingLeftRefs = generateResponsiveStyles('padding-left', 'spacing');

export function Box(props) {
    const {
        children,
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        className,
        ...rest
    } = props;

    const resolvedPaddingTop = paddingTop || paddingY || padding;
    const resolvedPaddingRight = paddingRight || paddingY || padding;
    const resolvedPaddingBottom = paddingBottom || paddingY || padding;
    const resolvedPaddingLeft = paddingLeft || paddingY || padding;

    return (
        <div
            className={cx(
                resolveResponsiveClass(paddingTopRefs, resolvedPaddingTop),
                resolveResponsiveClass(paddingRightRefs, resolvedPaddingRight),
                resolveResponsiveClass(paddingBottomRefs, resolvedPaddingBottom),
                resolveResponsiveClass(paddingLeftRefs, resolvedPaddingLeft),
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
}
