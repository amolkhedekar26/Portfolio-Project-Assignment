import React from "react";
import { TextArea } from "../../../components/TextArea";
import { TextInput } from "../../../components/TextInput";

function ProfileDetails({ profile }) {
  return (
    <div className="profile-main">
      <TextInput
        type="email"
        label="Email address"
        name="inputEmailReadonly"
        value={profile.email}
        placeholder="Enter your email here"
      />
      <TextInput
        type="text"
        label="Contact"
        name="inputContactReadonly"
        value={`+91${profile.contactNo}`}
        placeholder="Enter your contact here"
      />
      <TextArea
        label="About Me"
        name="inputAboutReadonly"
        value={profile.aboutMe}
        placeholder="Tell us about yourself"
      />
    </div>
  );
}

export default ProfileDetails;
