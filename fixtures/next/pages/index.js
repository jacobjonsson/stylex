import React from 'react';
import { stylex, cx } from '@jacobjonsson/stylex';
import styles from './styles.module.css';

const header = stylex`
    font-size: 28px;
    color: green;
`;

export default function Page() {
    return (
        <div className={styles.background}>
            <h1 className={cx(header)}>Hello world!</h1>
        </div>
    );
}
