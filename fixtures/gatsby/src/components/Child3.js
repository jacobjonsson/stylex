import React from 'react';
import { stylex, cx } from '@jacobjonsson/stylex';

const base = stylex`
  font-size: 16px;
  background-color: red;
  padding: 30px;
  color: white;
`;

export default function Child3() {
    return <div className={cx(base)}>Child 1</div>;
}
