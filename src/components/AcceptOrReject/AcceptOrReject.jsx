import React, { useState, useEffect } from "react";
import img from "../../images/Mr.B.png";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./AcceptOrReject.css";

const AdminPage = () => {
  let { words } = useContext(AuthContext);
  const [acceptRejectObj, setAcceptRejectObj] = useState({});
  let radios = document.getElementsByName("acceptReject");
  const [count, setcount] = useState(0);
  const [isSubmitted, setisSubmitted] = useState(false);
  
  const acceptRejectHandler = async (objectOfAllWords) => {
    let response = await fetch("http://137.184.193.17/api/accept-or-reject", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectOfAllWords),
    });
    if (response.ok) {
      // console.log("The words has been submitted");
      alert("all the words have been accepted or rejected.");
      window.location.reload();
    } else {
      console.log("something went wrong");
    }
  };

  const acceptRejectValue = (e) => {
    e.preventDefault();
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        setcount((count) => count + 1);
        let is_accepted = radios[i].value === "accept" ? true : false;
        setAcceptRejectObj((prev) => ({
          ...prev,
          [i]: { word: radios[i].id, is_accepted: is_accepted },
        }));
      }
    }
  };
  let lengthOfAcceptRejectObject = Object.keys(acceptRejectObj).length;
  if (
    lengthOfAcceptRejectObject === count &&
    lengthOfAcceptRejectObject !== 0
  ) {
    acceptRejectHandler(acceptRejectObj);
  }

  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="container">
        <div className="input-word">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Word of the day</th>
                <th scope="col">Word Submitted</th>
                <th scope="col">Accept or Reject</th>
              </tr>
            </thead>
            <tbody>
              {words.map((curElem) => {
                return (
                  <tr key={curElem.word}>
                    <td>{curElem.user}</td>
                    <td>{curElem.Word_of_the_day}</td>
                    <td>{curElem.word}</td>
                    <td>
                      <form>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              value="accept"
                              name="acceptReject"
                              id={curElem.word}
                            />
                            Accept
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              value="reject"
                              name="acceptReject"
                              id={curElem.word}
                            />
                            Reject
                          </label>
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="submit-button-WOTD"
            type="submit"
            onClick={acceptRejectValue}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
