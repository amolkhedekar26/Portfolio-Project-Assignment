import React from "react";
import { Modal } from "../../../components/Modal";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { TextAreaRef } from "../../../components/TextAreaRef";
import { TextInputRef } from "../../../components/TextInputRef";

function EditProfileModal({
  profile,
  isOpen,
  setOpen,
  inputRef,
  handleEditProfile,
}) {
  return (
    <div className="">
      {isOpen && (
        <>
          <div className="modal-container">
            <Modal heading={"Edit Profile"} isOpen={isOpen} setOpen={setOpen}>
              <form action="">
                <TextInputRef
                  type="text"
                  label="First Name"
                  name="inputFirstName"
                  value={profile.firstName}
                  placeholder="Enter your first here"
                  ref={inputRef}
                />
                <TextInputRef
                  type="text"
                  label="Last Name"
                  name="inputLastName"
                  value={profile.lastName}
                  placeholder="Enter your last here"
                  ref={inputRef}
                />
                <TextInputRef
                  type="text"
                  label="Location"
                  name="inputLocation"
                  value={profile.location}
                  placeholder="Enter your location here"
                  ref={inputRef}
                />

                <TextInputRef
                  type="text"
                  label="Contact"
                  name="inputContact"
                  value={profile.contactNo}
                  placeholder="Enter your contact here"
                  ref={inputRef}
                />
                <TextAreaRef
                  label="About Me"
                  name="inputAbout"
                  value={profile.aboutMe}
                  placeholder="Tell us about yourself"
                  ref={inputRef}
                />
                <PrimaryButton onClick={handleEditProfile}>Save</PrimaryButton>
              </form>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfileModal;
