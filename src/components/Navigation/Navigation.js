import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, Redirect } from 'react-router-dom';
import authOperations from '../../redux/auth/authOperations';
import routes from '../../routes';
import styles from './Navigation.module.css';

class Navigation extends Component {
    handleClick = e => {
        e.preventDefault();
        const { onLogout, auth } = this.props;
        onLogout(auth.user);
    }
    render() {
        const { logined } = this.props;

        return (
        <>
            <ul className={styles.list}>
                {!logined
                    ? <li> <Link exact="true" to={routes.login}>Login</Link></li>
                    : <li> <a href="" className={styles.logout} onClick={this.handleClick}>Logout</a></li>
                }
                <li>
                    <NavLink
                        to={routes.register}
                        className="Navigation-link"
                        activeClassName="Navigation-link-active">
                        Register
                    </NavLink>
                </li>

            </ul>
        </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = state => ({

})

export default connect(mapStateToProps, { onLogout: authOperations.logout })(Navigation);