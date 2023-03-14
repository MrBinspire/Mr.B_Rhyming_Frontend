import React, { useState } from "react";
import "./AdminPage.css";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  let { wordOfTheDayPost } = useContext(AuthContext);
  return (
    <div className="admin-main">
      <div className="admin-card">
        <div className="image">
          <img className="logo" src={img} alt="Mr. B" />
        </div>
        <div className="container">
          <div className="Word-of-the-day">
            Enter Today's Rhyme of the day:
            <div className="input-word">
              <Form onSubmit={wordOfTheDayPost}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Word of the day"
                  className="wordoftheday"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter a word for the day"
                    className="wordoftheday"
                    name="wordOfTheDay"
                    // onChange={(e) => setWordOfTheDay(e.target.value)}
                  />
                </FloatingLabel>
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
