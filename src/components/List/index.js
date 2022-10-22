import React from "react";
import User from "./User";
import "./index.css";
import userList from "./Users.json";

const ListComponent = () => {
  return (
    <div className="users">
      <h1>List Of Users</h1>
      {userList.map((UserData, index) => (
        <User
          name={UserData.name}
          age={UserData.age}
          gender={UserData.gender}
          key={index}
        />
      ))}
    </div>
  );
};
export default ListComponent;
