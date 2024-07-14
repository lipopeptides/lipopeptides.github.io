import React from 'react';
import { AppBar } from 'react-admin';

const CustomAppBar = props => {
    return (
        <AppBar 
            className="toolbar" 
            userMenu={false}
            {...props}
        >
            <h4 className="toolbar-title">Lipopeptides</h4>
        </AppBar>
    );
};

export default CustomAppBar;