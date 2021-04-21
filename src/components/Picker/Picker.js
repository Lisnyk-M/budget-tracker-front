import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Picker.module.css';

class Picker extends Component { 
    render() {
        const { date, onChange } = this.props;

        return (
            <input 
                className={styles.inputDate}
                type="date"
                name="date"
                value={date}
                onChange={onChange}
            />
        )
    }

}

export default Picker;

