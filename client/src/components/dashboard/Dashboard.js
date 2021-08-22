import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner'
// import DashBoardActions from './DashboardActions';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading }}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i>
            Welcome { user && user.name }
        </p>
        {
            profile !== null ? <Fragment>
                {/* <DashBoardActions /> */}
                <div class="dash-buttons">  
                    <Link to="/edit-profile" class="btn btn-light">
                    <i class="fas fa-user-circle text-primary"></i> Edit Profile </Link>
                </div>
                <div className='my-2'><button className='btn btn-danger' onClick={() => deleteAccount()}> 
                <i className='fas fa-user-minus'></i> Delete my account</button> </div>
            </Fragment> : 
            <Fragment>
                <p> Set up your profile because you don't have one. </p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </Fragment>
        }
    </Fragment> 
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
