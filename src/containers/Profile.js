import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/account";

const Profile = ({ ...props }) => {

  console.log('Profile props including from dashboard', props);

  const { handleDeleteUser,
    onLogout,
    appState } = props;
  
  const { account } = appState;
  const { user } = account;

  const renderProfile = () => {
    if (account.loading) return <div>Loading...</div>;
    if (account.errors.length > 0)
      return <div>Unable to load profile, try again please</div>;

    if (user) {
      const formatedDate = user.created_at.split("T");

      return (
        <div className="user-profile">
          <h1 className="username">{user.email}</h1>
          <h2 className="created_at">Created date: {formatedDate[0]}</h2>
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
