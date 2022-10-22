import "./User.css";
const User = (props) => {
  return (
    <div className="user-container">
      <div className="user-name">{props.name}</div>
      <div className="user-details">
        <span>{props.age}</span>
        <span>{props.gender}</span>
      </div>
    </div>
  );
};
export default User;
