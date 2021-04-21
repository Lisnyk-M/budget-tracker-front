import React, { Component } from 'react';
import {connect} from 'react-redux';
import authOperations from '../../../redux/auth/authOperations';
import EntryButton from '../../EntryButton/EntryButton';
import Input from '../../Input/Input';

import styles from './EntriesForm.module.css';

class EntriesForm extends Component {
    state = {
        category: '',
        spent: '',
    }

    componentDidUpdate (prevProps) {
        const {positionRequest} = this.props;

        if (prevProps.positionRequest !== positionRequest) {
            const positionObject = {
                category: positionRequest.category,
                spent: positionRequest.spent,
            }

            this.setState({...positionObject})
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {onAddEntry, date} = this.props;

        const entryWithDate = {
            ...this.state, date
        }
        onAddEntry({...entryWithDate});
        
        this.setState({
            category: '',
            spent: '',
        })
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const {category, spent} = this.state;

        return (
            <div className={styles.formWrapper}>
                <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                    <Input placeholder="Categories" name="category" onChange={this.handleInput} value={category}/>
                    <Input placeholder="Spent" name="spent" onChange={this.handleInput} value={spent}/>
                    <EntryButton title="Create Entry"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    positionRequest: state.positionRequest,
    date: state.date,
})

export default connect(mapStateToProps, {onAddEntry: authOperations.addEntry})(EntriesForm);
