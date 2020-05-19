import React from 'react';
import { stylex, cx } from '@jacobjonsson/stylex';

const base = stylex`
  font-size: 16px;
  background-color: red;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: center;
`;

export default function Child2() {
    return <div className={cx(base)}>Child 1</div>;
}
