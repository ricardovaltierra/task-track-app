/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import date from 'date-and-time';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ ...props }) => {
  const { onLogout, onDelete, appState } = props;

  const { account } = appState;
  const { loading, errors } = account;
  const { user } = account;

  const renderProfile = () => {
    if (loading) return <div>Loading...</div>;
    if (errors.length > 0) return <div>Unable to load profile, try again please</div>;

    if (user) {
      const dateTime = user.created_at.split('T');
      const dateArray = dateTime[0].split('-');
      const pattern = date.compile('MMM D YYYY');
      const dateFormat = date.format(
        new Date(dateArray[0], dateArray[1], dateArray[2]),
        pattern,
      );

      return (
        <div className="user-profile">
          <div className="picture-info">
            <div className="picture" />
            <div className="username"><h1>{user.email}</h1></div>
            <h2 className="created_at">
              Created:
              {dateFormat}
            </h2>
          </div>
          <div className="buttons">
            <div role="button" tabIndex={0} onClick={() => onDelete(user)}>
              <p>Delete account</p>
            </div>
            <div role="button" onClick={onLogout} tabIndex={0}>
              <p data-testid="logout-button">Logout</p>
            </div>
          </div>
        </div>
      );
    }

    return '';
  };

  return <>{renderProfile()}</>;
};

const mapStateToProps = state => ({
  appState: state,
});

Profile.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  appState: PropTypes.shape({
    account: PropTypes.shape({
      loading: PropTypes.bool,
      errors: PropTypes.string,
      user: PropTypes.shape({
        email: PropTypes.string,
        created_at: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default connect(mapStateToProps, null)(Profile);
