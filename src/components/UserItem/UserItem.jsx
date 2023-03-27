import React, { useState } from "react";
import "./UserItem.css";
import "remixicon/fonts/remixicon.css";
import getRandomKey from "../../constants/getRandomKey";
import NATIONALITIES from "../../constants/nationalities";
import VALIDATIONS from "../../constants/validations";
import VALIDATION_FEEDBACK from "../../constants/validationFeedback";

export default function UserItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [genderValue, setGenderValue] = useState(props.gender);
  const handleGenderRadioChange = () => {
    const genderNewValue = genderValue === "male" ? "female" : "male";
    setGenderValue(genderNewValue);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteUser(props.id);
  };

  const handleChangeClose = (e) => {
    e.preventDefault();
    setGenderValue(props.gender);
    changeEditMode();
  };
  const handleChangeEditMode = (e) => {
    e.preventDefault();
    changeEditMode();
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
    props.changeDisable();
  };
  const updateElement = (e) => {
    e.preventDefault();
    const datasetNodelist = [...document.querySelectorAll(".data")];
    const datasetKeyList = datasetNodelist.map((item) => item.dataset.key);
    const datasetValueList = datasetNodelist.map((item) => item.value);

    let isValidForm = true;
    datasetNodelist.forEach((item) => {
      const validitionValue = validation(item);
      if (!validitionValue) {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      datasetKeyList.forEach((key, index) => {
        if (datasetValueList[index] !== props[key]) {
          props.editElement(props.id, key, datasetValueList[index]);
        }
      });
      props.editElement(props.id, "gender", genderValue);
      changeEditMode();
    }
  };

  const validation = (item) => {
    console.log(item);
    const labelElement = item.previousElementSibling;
    if (labelElement && [...labelElement.classList].includes("text-danger")) {
      item.previousElementSibling.classList.remove("text-danger");
    }
    item.classList.remove("is-invalid");
    const itemValue = item.value.toString();
    const itemKey = item.dataset.key;
    const regex = new RegExp(VALIDATIONS[itemKey]);
    console.log(regex.test(itemValue));
    if (!regex.test(itemValue)) {
      item.classList.add("is-invalid");
      if (labelElement) {
        labelElement.classList.add("text-danger");
      }
    }
    return regex.test(itemValue);
  };

  const editButton = () => {
    return (
      <div className="btn">
        <button onClick={handleChangeEditMode} className="btn__edit">
          Edit
        </button>
      </div>
    );
  };
  const saveAndCloseButton = () => {
    return (
      <div className="btn">
        <div>
          <button onClick={updateElement} className="btn__edit">
            Confirm
          </button>
        </div>
        <div>
          <button onClick={handleChangeClose} className="btn__edit">
            Close
          </button>
        </div>
      </div>
    );
  };

  const editView = (value, propsKey) => {
    return (
      <div>
        <input
          className="data"
          type="text"
          data-key={propsKey}
          name={propsKey}
          id={propsKey}
          defaultValue={value}
          onChange={(e) => {
            validation(e.target);
          }}
        />
        <div className="validation__feedback">
          <p>{VALIDATION_FEEDBACK[propsKey]}</p>
        </div>
      </div>
    );
  };
  const defaultView = (value) => {
    return (
      <div>
        <input type="text" disabled defaultValue={value} />
      </div>
    );
  };

  const getListOfNationalities = Object.values(NATIONALITIES);
  const optionsListOfNationalities = getListOfNationalities.map(
    (nationality) => {
      return <option key={getRandomKey()}>{nationality}</option>;
    }
  );

  const changeNationality = () => {
    return (
      <select data-key="nationality" className="data" id="nationality">
        <option>{props.nationality}</option>
        {optionsListOfNationalities}
      </select>
    );
  };

  const listNationality = (
    <div key={getRandomKey} className="label">
      <label htmlFor="nationality">Nationality:</label>
      {editMode ? changeNationality() : defaultView(props.nationality)}
    </div>
  );

  const changeGender = () => {
    return (
      <div key={getRandomKey} className="gender__change">
        <input
          type="radio"
          name="gender"
          id="male"
          label="male"
          checked={genderValue === "male"}
          onChange={handleGenderRadioChange}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="female"
          label="female"
          checked={genderValue === "female"}
          onChange={handleGenderRadioChange}
        />
        <label htmlFor="female">Female</label>
      </div>
    );
  };

  const listGender = (
    <div key={getRandomKey()} className="label">
      <label>Gender:</label>
      {editMode ? changeGender() : defaultView(props.gender)}
    </div>
  );

  const userPropsKeys = Object.keys(props);
  const listKeys = userPropsKeys.filter((key) => {
    if (
      key === "picture" ||
      key === "gender" ||
      key === "nationality" ||
      key === "id" ||
      key === "deleteUser" ||
      key === "disabled" ||
      key === "changeDisable" ||
      key === "editElement"
    ) {
      return false;
    } else {
      return true;
    }
  });

  const listTextElements = listKeys.map((propsKey) => {
    return (
      <div key={getRandomKey()} className="label">
        <label htmlFor={propsKey}>{propsKey}: </label>
        {editMode
          ? editView(props[propsKey], propsKey)
          : defaultView(props[propsKey])}
      </div>
    );
  });

  return (
    <div className="user">
      <img src={props.picture} alt={props.name} />
      <form action="#" className="form">
        {listNationality}
        {listGender}
        {listTextElements}
        {editMode ? saveAndCloseButton() : editButton()}
      </form>
      <button onClick={handleDelete} className="btn__delete">
        <i className="ri-close-fill "></i>
      </button>
    </div>
  );
}
