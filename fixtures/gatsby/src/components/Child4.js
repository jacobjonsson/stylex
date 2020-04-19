import React from 'react';
import { stylex, cx } from 'stylex';

const base = stylex`
  font-size: 16px;
  background-color: red;
  padding: 20px;
  color: white;
`;

export default function Child4() {
    return <div className={cx(base)}>Child 1</div>;
}
