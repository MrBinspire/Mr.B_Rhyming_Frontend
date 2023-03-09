import React, { useEffect } from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./HomeInputPage.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeInputPage = () => {
  let { wordOfDay, user } = useContext(AuthContext);
  const d = new Date();
  var day = d.toLocaleString("en-CA", { day: "2-digit" });
  var month = d.toLocaleString("en-CA", { month: "2-digit" });
  var year = d.toLocaleString("en-CA", { year: "numeric" });

  const today_date = year + "-" + month + "-" + day;

  const [inputArr, setInputArr] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [isRemoveClicked, setisRemoveClicked] = useState(false);

  const notify = () => toast("All the words have been submitted!");
  const submitHandler = (e) => {
    e.preventDefault();
    setInputWord("");
    wordInput();
    setInputArr([]);
  };
  const changInput = (e) => {
    if (inputWord === "") {
      alert("Enter a valid word!");
    } else {
      e.preventDefault();
      setInputArr([...inputArr, { inputWord }]);
      setInputWord("");
    }
  };

  const removeHandler = (e) => {
    e.preventDefault();
    setisRemoveClicked(!isRemoveClicked);
    let req_index = e.target.getAttribute("data-index");
    console.log("InputArray = ", inputArr);
    console.log("req_index = ", req_index);

    let new_arr = inputArr;
    new_arr.splice(req_index, 1);
    setInputArr((prev) => (prev = new_arr));
    console.log("After set splice", inputArr);
  };

  let reqWord = "";
  for (let value of wordOfDay) {
    if (value["date"] === today_date) {
      reqWord = value["Word_of_the_day"];
    }
  }

  let wordInput = async (e) => {
    for (let word in inputArr) {
      if (inputArr[word].inputWord === "") {
        continue;
      }
      let item = {
        user: user.username,
        word: inputArr[word].inputWord,
        Word_of_the_day: reqWord,
      };
      // console.log(authTokens.access)
      // let accessToken = authTokens.access
      let response = await fetch("https://api.rhymes.world/api/home-input", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
      });
      if (response.status === 200) {
        console.log(response.status);
        console.log("The word has been submitted");
      } else {
        console.log("something went wrong");
      }
    }
    notify();
  };

  const mappingHelper = inputArr.map((value, index) => {
    return (
      <div key={index}>
        <span className="before-submission container">
          {value.inputWord}&nbsp;
          <button
            className="remove-button"
            data-index={index}
            onClick={removeHandler}
          >
            X
          </button>
        </span>
      </div>
    );
  });

  const inputLetterHandler = (e) => {
    // console.log("inputLetterHandler");
    setInputWord(e.target.value);
  };
  useEffect(() => {}, [isRemoveClicked]);
  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="Home-WOTD">
        Today's Word Of The Day is:
        <div className="WOTD">{reqWord}</div>
      </div>
      <div className="rhyming-words">
        Enter Some Rhyming Words
        <div className="input-word">
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="A Rhyming Word"
              className="rhymingWord"
            >
              <Form.Control
                type="text"
                placeholder="Rhyming Word"
                name="inputWord"
                className="rhymingWord"
                value={inputWord}
                onChange={inputLetterHandler}
              />
            </FloatingLabel>
            <button className="addmore-button-rhyme" onClick={changInput}>
              Add More
            </button>
            <div className="input-table">
              <div className="input-array">{mappingHelper}</div>
            </div>
            <br />
            <button
              className="submit-button-rhyme"
              type="submit"
              onClick={submitHandler}
              disabled={inputArr !== [] ? false : true}
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomeInputPage;
