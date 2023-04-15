import React from "react";
import NATIONALITIES from "../../constants/nationalities";
import getRandomKey from "../../constants/getRandomKey";
import "./UserFilter.css";

export default function UserFilter(props) {
  const getListOfNationalities = Object.values(NATIONALITIES);
  const optionsListOfNationalities = getListOfNationalities.map(
    (nationality) => {
      return <option key={getRandomKey()}>{nationality}</option>;
    }
  );

  const listNationality = (formClassName) => {
    return (
      <div>
        <label htmlFor="#">Nationality: </label>
        <select className={formClassName}>
          <option>Any</option>
          {optionsListOfNationalities}
        </select>
      </div>
    );
  };

  const listLength = (
    <div>
      <label htmlFor="#">Length of list: </label>
      <select className="js-form-length">
        <option>1</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>
    </div>
  );

  const listGender = (formClassName) => {
    return (
      <div>
        <label htmlFor="#">Gender: </label>
        <select className={formClassName}>
          <option>Any</option>
          <option>Female</option>
          <option>Male</option>
        </select>
      </div>
    );
  };

  const addNewList = (e) => {
    e.preventDefault();
    const length = document.querySelector(".js-form-length").value;
    const nationality = document.querySelector(".js-form-nationality").value;
    const gender = document.querySelector(".js-form-gender").value;
    props.handleMultipleFilter(length, nationality, gender);
  };

  return (
    <>
      <div className="filter__section">
        <form action="#" className="filter__form">
          <div className="filter__data">
            {listNationality("js-form-nationality")}
            {listGender("js-form-gender")}
            {listLength}
          </div>
          <button
            type="submit"
            title="Add user/users"
            onClick={addNewList}
            className="btn__add"
          >
            <i class="ri-user-add-line"></i>
          </button>
        </form>
      </div>
    </>
  );
}
