import React, { Component } from 'react';
import Input from '../../Input/Input';
import EntryButton from '../../EntryButton/EntryButton';
import sendNotification from '../../../helpers/notification';
import authOperations from '../../../redux/auth/authOperations';
import { connect } from 'react-redux';
import styles from './RegistrationForm.module.css';

class RegistrationForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    componentDidMount = prevprops => {
        const {logined, onLogout, auth} = this.props;
        if (logined) {
            onLogout(auth.user);
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;
        if (name === '' || email === '' || password === '') {
            sendNotification('some field is empty');
            return;
        }

        this.props.onRegister({ ...this.state })
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    render() {
        const { name, email, password } = this.state;

        return (
            <div className={styles.formWrapper}>
                <form onSubmit={this.handleSubmit} className={styles.loginForm}>
                    <Input type="string" placeholder="name" value={name} onChange={this.handleChange} name="name"></Input>
                    <Input type="email" placeholder="email" value={email} onChange={this.handleChange} name="email"></Input>
                    <Input type="password" placeholder="password" value={password} onChange={this.handleChange} name="password"></Input>
                    <EntryButton type="submit" title="Register"></EntryButton>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    logined: state.logined,
    auth: state.auth,
})

export default connect(mapStateToProps, { 
    onRegister: authOperations.register,
    onLogout: authOperations.logout,
 })(RegistrationForm);