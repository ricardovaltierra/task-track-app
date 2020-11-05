import React from "react";
import date from 'date-and-time';
import { connect } from "react-redux";
import { fetchUser } from "../actions/account";

const Profile = ({ ...props }) => {
  
  const { 
    handleDeleteUser,
    onLogout,
    appState } = props;
  
  const { account } = appState;
  const { user } = account;

  const renderProfile = () => {
    if (account.loading) return <div>Loading...</div>;
    if (account.errors.length > 0)
      return <div>Unable to load profile, try again please</div>;

    if (user) {
      const dateTime = user.created_at.split("T");
      const dateArray = dateTime[0].split("-");
      const pattern = date.compile('MMM D YYYY');
      const dateFormat = date.format(new Date(dateArray[0], dateArray[1], dateArray[2]), pattern);

      return (
        <div className="user-profile">
          <h1 className="username">{user.email}</h1>
          <h2 className="created_at">Created: {dateFormat}</h2>
          <button>Delete account</button>
          <button onClick={onLogout}>Logout</button>
        </div>
      );
    }
  };

  return <>{renderProfile()}</>;
};

const mapStateToProps = (state) => ({
  appState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleDeleteUser: () => dispatch(fetchUser("delete_user")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
