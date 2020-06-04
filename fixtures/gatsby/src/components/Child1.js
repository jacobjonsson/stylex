import React from 'react';
import { stylex, cx } from '@jacobjonsson/stylex';
import './Child1.css';
import { Box } from './Box';

const base = stylex`
  font-size: 16px;
  background-color: red;
  color: white;

  @media (min-width: 768px) {
      background-color: green;
  }

  @media (min-width: 1024px) {
      background-color: blue;
  }
`;

export default function Child1() {
    return (
        <Box padding="medium" className={cx('background', base)}>
            Child 1
        </Box>
    );
}
