import React from 'react';
import { stylex, cx } from '@jacobjonsson/stylex';
import './Child1.css';

const base = stylex`
  font-size: 16px;
  background-color: red;
  padding: 20px;
  color: white;

  @media (min-width: 768px) {
      background-color: green;
  }

  @media (min-width: 1024px) {
      background-color: blue;
  }
`;

export default function Child1() {
    return <div className={cx('background', base)}>Child 1</div>;
}
