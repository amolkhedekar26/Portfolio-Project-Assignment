import React from "react";
import { TextInput } from "../../components/TextInput";

function AddProfileModal({initialState, handleChangeModalForm}) {
  return (
    <div>
        <TextInput
          type="text"
          label="Contact"
          name="inputContact"
          value={initialState.inputContact}
          placeholder="Enter your contact here"
          onChange={handleChangeModalForm}
        />
    </div>
  );
}

export default AddProfileModal;
