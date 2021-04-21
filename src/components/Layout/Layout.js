import React from 'react';
import propTypes from 'prop-types';
import styles from './Layout.module.css';

const Layout = ({children}) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: propTypes.node
}

export default Layout;