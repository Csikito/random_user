import React, { useState } from "react";
import NATIONALITIES from "../../constants/nationalities";
import getRandomKey from "../../constants/getRandomKey";
import "./UserFilter.css";

export default function UserFilter(props) {
  const [active, setActive] = useState(false);

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
          <option>female</option>
          <option>male</option>
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

  const deleteAllUser = (e) => {
    e.preventDefault();
    props.deleteUsers();
  };

  return (
    <>
      <div className={`filter__section ${active && "active"}`}>
        <form action="#" className="filter__form">
          <div className="filter__data">
            {listNationality("js-form-nationality")}
            {listGender("js-form-gender")}
            {listLength}
          </div>
          <div className="filter__buttons">
            <button
              type="submit"
              title="Delete users"
              onClick={deleteAllUser}
              className="btn__add"
            >
              <i className="ri-user-unfollow-line"></i>
            </button>

            <button
              type="submit"
              title="Add user/users"
              onClick={addNewList}
              className="btn__add"
            >
              <i className="ri-user-add-line"></i>
            </button>
          </div>
        </form>
        <p className={`arrow__down ${active && "active"}`}>
          <i
            className={`ri-arrow-down-s-fill `}
            onClick={() => setActive(!active)}
          ></i>
        </p>
      </div>
    </>
  );
}
