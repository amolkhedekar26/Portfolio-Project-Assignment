import React from "react";
import "./SearchInput.css";
import SearchIcon from "../../assets/icons/search.svg";

function SearchInput({ name, value, placeholder, onChange }) {
  return (
    <div className="search-input-container">
        <img src={SearchIcon} alt="" />
      <input
        className="search-input"
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;
