import React, { Component } from 'react';
import styles from './Input.module.css';

const Input = ({ placeholder, onChange, type = "text", value, name }) =>
    <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
    >
    </input>

export default Input;