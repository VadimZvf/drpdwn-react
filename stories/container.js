import React from 'react';
import './stories.css';

export default story => <div style={{ padding: 20 }}>{ story() }</div>;
