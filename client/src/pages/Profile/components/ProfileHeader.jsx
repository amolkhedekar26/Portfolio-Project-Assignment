import React from "react";
import EditIcon from "../../../assets/icons/edit.svg";

function ProfileHeader({ profile, modalToggler }) {
  return (
    <header className="profile-header">
      <div className="info-left">
        <span className="avatar">{profile.initials}</span>
        <h3 className="profile-name-location">
          <span className="profile-name">
            {profile.firstName} {profile.lastName}
          </span>
          <span className="profile-location">{profile.location}</span>
        </h3>
      </div>
      <button className="edit-btn" onClick={modalToggler}>
        <img src={EditIcon} alt="close" />
      </button>
    </header>
  );
}

export default ProfileHeader;
