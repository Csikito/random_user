import React, { useEffect, useState } from "react";
import UserItem from "../UserItem/UserItem";
import NATIONALITIES from "../../constants/nationalities";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    usersFetch();
  }, []);

  const changeDisable = () => {
    setDisabled(!disabled);
  };

  const handleClickAddMore = (e) => {
    e.preventDefault();
    usersFetch();
  };

  const usersFetch = () => {
    fetch("https://randomuser.me/api/?results=1")
      .then((resp) => resp.json())
      .then((respons) => {
        const data = respons.results;
        const newUserList = data.map((user) => {
          const newUser = {
            picture: user.picture.large,
            name: `${user.name.title} ${user.name.first} ${user.name.last}`,
            born: user.dob.date.slice(0, 10),
            gender: user.gender,
            nationality: NATIONALITIES[user.nat],
            location: `${user.location.country},${user.location.city},${user.location.street.name}`,
            email: user.email,
            cell: user.cell,
            key: user.login.uuid,
          };

          return newUser;
        });
        setUsers((oldUser) => [...oldUser, ...newUserList]);
      });
  };

  const editElement = (id, editedDataKey, editedDataNewValue) => {
    const newUserList = users.map((user) => {
      if (user.key === id) {
        user[editedDataKey] = editedDataNewValue;
      }
      return user;
    });
    setUsers(newUserList);
  };

  const deleteUser = (id) => {
    const newUserList = users.filter((user) => user.key !== id);
    setUsers(newUserList);
  };

  const userData = users.map((user) => (
    <UserItem
      picture={user.picture}
      name={user.name}
      born={user.born}
      gender={user.gender}
      nationality={user.nationality}
      location={user.location}
      email={user.email}
      cell={user.cell}
      id={user.key}
      key={user.key}
      deleteUser={deleteUser}
      disabled={disabled}
      changeDisable={changeDisable}
      editElement={editElement}
    />
  ));

  console.log(users);

  return (
    <div>
      <div>
        <button onClick={handleClickAddMore} className="btn__add">
          ADD MORE
        </button>
      </div>
      <div className="users">{userData}</div>
    </div>
  );
}
