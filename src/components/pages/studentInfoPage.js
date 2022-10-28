import "./style/student-style1.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5000/getStudentInfo";

const StudentInfo = () => {
  const [studentInfo, setStudentInfo] = useState();

  useEffect(() => {
    if (!studentInfo) {
      axios.get(api).then((response) => {
        console.log(response.data.data);
        setStudentInfo(response.data.data);
      });
    }
  });

  return (
    <div>
      <h1>Student Info Page</h1>
      <div clasName="container">
        {studentInfo && studentInfo.length > 0 && (
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Subject</th>
            </tr>
            {studentInfo.map((student) => (
              <tr>
                {/* <td><img src={student.image} alt="Girl in a jacket" width="50" height="60" /></td> */}
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.subject}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};
export default StudentInfo;
