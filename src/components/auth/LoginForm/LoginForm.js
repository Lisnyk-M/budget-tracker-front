import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import ReactNotification from 'react-notifications-component';

import authOperations from '../../../redux/auth/authOperations';
import Button from '../../EntryButton/EntryButton';
import Input from '../../Input/Input';
import sendNotification from '../../../helpers/notification';

import styles from './LoginForm.module.css';
// import 'react-notifications-component/dist/theme.css';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }

    componentDidUpdate = (prevProps) => {
        const {error} = this.props;
        if (prevProps.error !== error) {
            // sendNotification('kkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        }
    }

    componentDidMount = () => {
        const { logined } = this.props;
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.props.onLogin({ ...this.state });
    }

    handleInput = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;
        const { logined } = this.props;

        return (
            <>
                {logined && <Redirect to="/entries" from="/login" />}
                <div className={styles.formWrapper}>
                    <form onSubmit={this.handleSubmit} className={styles.loginForm}>
                        <Input type="email" placeholder="email" value={email} onChange={this.handleInput} name="email"></Input>
                        <Input type="password" placeholder="password" value={password} onChange={this.handleInput} name="password"></Input>
                        <Button type="submit" title="Login" ></Button>
                    </form>
                </div>
                {/* <ReactNotification /> */}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    logined: state.logined,
    error: state.error,
})

export default connect(mapStateToProps, {
    onLogin: authOperations.login,
    onLogout: authOperations.logout,
})(LoginForm);