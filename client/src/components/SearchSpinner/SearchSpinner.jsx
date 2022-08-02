import React from "react";
import SearchSpinnerIcon from "../../assets/icons/search.svg";
import "./SearchSpinner.css";

function SearchSpinner() {
  return (
    <div className="search-spiiner-container">
      <img className="search-spinner" src={SearchSpinnerIcon} alt="" />
    </div>
  );
}

export default SearchSpinner;
