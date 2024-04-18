import React from 'react';

const Label = ({ required, children }) => (
    <label style={{ color: required ? 'black' : 'inherit' }}>
        {children}
        {required && <span style={{ color: 'red' }}> *</span>}
    </label>
);

export default Label;
