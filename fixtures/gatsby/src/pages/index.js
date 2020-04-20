import React from 'react';
import { stylex, cx } from '@jacobjonsson/stylex';
import Child1 from '../components/Child1';
import Child2 from '../components/Child2';
import Child3 from '../components/Child3';
import Child4 from '../components/Child4';

const heading = stylex`
  background-color: red;
  font-size: 100px;

  padding: ${(theme) => theme.spacing.medium};

  @media (min-width: 768px) {
    background-color: yellow;
  }
`;

const blue = stylex`
  background-color: blue;

  @media (min-width: 768px) {
    background-color: green;
  }
`;

const IndexPage = () => {
    const [isBlue, setIsBlue] = React.useState(false);

    return (
        <React.Fragment>
            <h1 className={cx(heading, isBlue && blue)}>Hi people</h1>
            <button onClick={() => setIsBlue(!isBlue)}>Toggle blue class</button>

            <Child1 />
            <Child2 />
            <Child3 />
            <Child4 />
        </React.Fragment>
    );
};

export default IndexPage;
