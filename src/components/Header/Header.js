import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.css';
import { connect } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';

class Header extends Component {
    state = {
        user: 'user',
        logined: false,
    }

    componentDidUpdate = () => {
        const { user, logined } = this.props;
        if (user !== this.state.user) {
            this.setState({ user: user });
        }

        if (logined !== this.state.logined) {
            this.setState({logined});
        }
    }

    render() {
        const { user, logined } = this.state;

        return (
            <div className={styles.headerWrapper}>
                <h2>Budget tracker app</h2>
                <div>
                    <h3>{user}</h3>
                    <Navigation logined={logined}/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user.name,
    logined: state.logined,
})

export default connect(mapStateToProps, { onRegister: authOperations.register })(Header);