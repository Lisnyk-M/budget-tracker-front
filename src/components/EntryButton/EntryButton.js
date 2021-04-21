import React from 'react';
import styles from './EntryButton.module.css';

const EntryButton = ({ type = "submit", title, onClick }) => 
    <button
        type={type}
        className={styles.entryButton}
        onClick={onClick}
    >
        {title}
    </button>


export default EntryButton;