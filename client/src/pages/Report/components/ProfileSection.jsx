import React from "react";
import { TextArea } from "../../../components/TextArea";
import Erroricon from "../../../assets/icons/erroricon.svg";

export default function ProfileSection({ profile }) {
  let profileContent = null;
  if (profile) {
    profileContent = (
      <>
        <header className="profile-header">
          <div className="info-left">
            <span className="avatar">JR</span>
            <h3 className="profile-name-location">
              <span className="profile-name">
                {profile.firstName} {profile.lastName}
              </span>
              <span className="profile-location">{profile.location}</span>
              <div className="profile-email-contact-div">
                <span className="profile-email">{profile.email}</span>
                <span className="profile-contact">{`+91${profile.contactNo}`}</span>
              </div>
            </h3>
          </div>
        </header>
        <div className="profile-about-div">
          <TextArea
            name="inputAbout"
            label="About Me"
            value={profile.aboutMe}
          />
        </div>
      </>
    );
  } else {
    profileContent = (
      <>
        <h5 className="report-profile-title">Profile</h5>
        <div className="no-data">
          <img src={Erroricon} alt="" />
          <p>Oops ! No Profile Data found.</p>
        </div>
      </>
    );
  }
  return (
    <>
      {profileContent}
    </>
  );
}
