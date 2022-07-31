import Multiselect from "multiselect-react-dropdown";
import React from "react";
import { Modal } from "../../../components/Modal";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { TextInputRef } from "../../../components/TextInputRef";
import PlusRedIcon from "../../../assets/icons/plus_red.svg";

function AddProjectModal({
  isOpen,
  setOpen,
  inputRef,
  skills,
  stateModalForm,
  skillSelected,
  skillRemoved,
  handleSave,
}) {
  return (
    <div className="">
      {isOpen && (
        <>
          <div className="modal-container">
            <Modal
              heading={"Add a New Project"}
              isOpen={isOpen}
              setOpen={setOpen}
            >
              <form action="">
                <TextInputRef
                  type="text"
                  label="Project Title"
                  name="inputProjectName"
                  value={""}
                  placeholder="Enter your project name here"
                  ref={inputRef}
                />
                <TextInputRef
                  type="text"
                  label="Project Description"
                  name="inputProjectDescription"
                  value={""}
                  placeholder="Enter your project description here"
                  ref={inputRef}
                />

                <label className="projectskills-title">
                  Add Project Skills
                </label>
                <div className="add-skills-input-div">
                  <img className="add-img" src={PlusRedIcon} alt="" />
                  <Multiselect
                    options={skills.map((item) => item.name)} // Options to display in the dropdown
                    selectedValues={stateModalForm.inputProjectSkills} // Preselected value to persist in dropdown
                    onSelect={skillSelected} // Function will trigger on select event
                    onRemove={skillRemoved} // Function will trigger on remove event
                    isObject={false}
                    placeholder=""
                  />
                </div>

                {/* {stateModalForm.inputProjectName.length > 0 &&
              stateModalForm.inputProjectDescription.length > 0 && (
                <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
              )} */}
                <PrimaryButton onClick={handleSave}>Add Project</PrimaryButton>
              </form>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}

export default AddProjectModal;
