import React from 'react';

const Counter = (props) => {
    const {number} = props;
    return (
        <div style={{fontSize: 30, margin: 20}}>
            {number}
        </div>
    );
};

export default Counter;