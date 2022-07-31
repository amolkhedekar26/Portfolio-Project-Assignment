import React, { useEffect, useRef, useState } from "react";

import "./Profile.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, createProfile } from "../../actions/profile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import EditProfileModal from "./components/EditProfileModal";
import ProfileContent from "./components/ProfileContent";
import ProfileContainer from "./components/ProfileContainer";

import { ToastContainer, notify } from "../../utils/toast";
import ProfileValidator from "../../validation/Profile";

function Profile(props) {
  let navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const defaultProfile = {
    firstName: "First Name",
    lastName: "Last Name",
    location: "Your Location",
    contactNo: "xxxxxxxxxx",
    aboutMe: "Your Bio",
    initials: "FL",
    email: currentUser.email,
  };

  const [isOpen, setOpen] = useState(false);

  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const inputRef = useRef({});

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const trimData = (data) => {
    const { firstName, lastName, location, contactNo, aboutMe } = data;
    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      location: location.trim(),
      contactNo: contactNo.trim(),
      aboutMe: aboutMe.trim(),
    };
  };

  // Handle submit for modal form
  function handleEditProfile(e) {
    e.preventDefault();
    const reqBody = {
      firstName: inputRef.current.inputFirstName.value,
      lastName: inputRef.current.inputLastName.value,
      location: inputRef.current.inputLocation.value,
      contactNo: inputRef.current.inputContact.value,
      aboutMe: inputRef.current.inputAbout.value,
    };
    const trimmedData = trimData(reqBody);
    const isValid = ProfileValidator.validate(trimmedData, notify);
    if (isValid) {
      dispatch(createProfile(trimmedData, notify,setOpen));
      // setOpen(false);
      setTimeout(() => {
        dispatch(getProfile());
      }, 1000);
    }
   
  }

  if (currentUser && profile) {
    profile.email = currentUser.email;
  }
  return (
    <ProfileContainer>
      <ProfileHeader
        profile={profile ? profile : defaultProfile}
        modalToggler={() => setOpen(!isOpen)}
      />
      <ProfileContent>
        <ProfileDetails profile={profile ? profile : defaultProfile} />
        <EditProfileModal
          profile={profile ? profile : defaultProfile}
          isOpen={isOpen}
          setOpen={setOpen}
          inputRef={inputRef}
          handleEditProfile={handleEditProfile}
        />
        <ToastContainer />
      </ProfileContent>
    </ProfileContainer>
  );
}

export default Profile;
