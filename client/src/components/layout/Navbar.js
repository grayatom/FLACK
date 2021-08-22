import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>People</Link>
            </li>
            <li>
                <Link to={`/my-friends`}>Friends</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link onClick={logout} to='/login'>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>People</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-laugh-wink'></i> FLACK{' '}
                </Link>
            </h1>

            {!auth.loading && (
                <Fragment>
                    {auth.isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
