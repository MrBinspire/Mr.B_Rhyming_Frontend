import React from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Search.css";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "react-icons-kit/feather/search";
import Icon from "react-icons-kit";
import ReactGA from "react-ga";

const Search = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  // Helping functions for searching rhyming words-------------------------------------------------------------------------------

  let [searchWord, setSearchWord] = useState("");
  let [searchArr, setSearchArr] = useState([]);
  const [searchWordOfTheDay, setsearchWordOfTheDay] = useState("");
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const queryString = `?q=${encodeURIComponent(searchWord)}`;

  const searchGet = (e) => {
    e.preventDefault();
    setflag(true);
    axios
      .get("https://api.rhymes.world/api/search-rhyming-words")
      .then((response) => {
        setSearchArr(response.data);
        console.log(searchArr);
      });
  };

  useEffect(() => {
    if (searchArr.length > 0) {
      let reqWord = searchWord.toLowerCase();
      for (let i of searchArr) {
        let wordOfTheDayInList = i.Word_of_the_day.toLowerCase();
        let wordInList = i.word.toLowerCase();
        if (reqWord === wordOfTheDayInList || reqWord === wordInList) {
          setsearchWordOfTheDay(wordOfTheDayInList);
          console.log(searchWordOfTheDay);
          break;
        }
      }
      navigate(`/search${queryString}`, {
        state: {
          flag: flag,
          searchWord: searchWord,
          searchArr: searchArr,
          searchWordOfTheDay: searchWordOfTheDay,
        },
      });
    }
  }, [searchArr, searchWord, flag, searchWordOfTheDay]);

  // Helping functions for inputting rhyming words---------------------------------------------------------------------------

  let { wordOfDay, user } = useContext(AuthContext);
  const d = new Date();
  var day = d.toLocaleString("en-UK", { day: "2-digit" });
  var month = d.toLocaleString("en-UK", { month: "2-digit" });
  var year = d.toLocaleString("en-UK", { year: "numeric" });

  const today_date = year + "-" + month + "-" + day;

  const [inputArr, setInputArr] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [isRemoveClicked, setisRemoveClicked] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (user) {
      if (inputArr.length > 0) {
        setInputWord("");
        wordInput();
        setInputArr([]);
      } else {
        inputArr.push({ inputWord });
        setInputWord("");
        wordInput();
        setInputArr([]);
      }
    } else {
      navigate("/login");
    }
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

  let wordInput = async (e) => {
    for (let word in inputArr) {
      if (inputArr[word].inputWord === "") {
        continue;
      }
      const notify = () =>
        toast(`${inputArr[word].inputWord} has been submitted`);
      const notify2 = () => toast("Something went wrong");
      let item = {
        user: user.username,
        word:
          inputArr[word].inputWord[0].toUpperCase() +
          inputArr[word].inputWord.substr(1),
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
      if (response.ok) {
        console.log("The word has been submitted");
        notify();
      } else {
        console.log("something went wrong");
        notify2();
      }
    }
  };
  let reqWord = "";
  for (let value of wordOfDay) {
    console.log(value);
    console.log(value["date"] === today_date);
    if (value["date"] === today_date) {
      reqWord = value["Word_of_the_day"];
    }
  }
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
    setInputWord(e.target.value);
  };

  return (
    // FOR SEARCHING RHYMING WORDS-----------------------------------------------------
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>

      <div className="search-word">
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Search Rhyming words"
            className="searchWord-search"
          >
            <Icon
              icon={search}
              size={20}
              onClick={searchGet}
              className="search-icon"
            />
            <Form.Control
              type="text"
              placeholder="Rhyming Word"
              name="searchWord"
              className="rhymingWord-search"
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
                setSearchArr([]);
                setsearchWordOfTheDay("");
              }}
            />
          </FloatingLabel>
          <button
            type="submit"
            className="submit-button-search"
            onClick={searchGet}
          >
            {/* Search */}
          </button>
        </Form>
      </div>

      {/* FOR INPUTTING RHYMING WORDS------------------------------------------------------------------------------------ */}

      {reqWord !== "" ? (
        <>
          <div className="Home-WOTD">
            Rhyme Of The Day:
            <div className="WOTD">{reqWord}</div>
          </div>
          <div className="rhyming-words">
            <div className="input-word">
              <Form>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Press enter after each word"
                  className="rhymingWord-label"
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
                <button
                  className="addmore-button-rhyme"
                  onClick={changInput}
                ></button>

                <div className="input-table">
                  <div className="input-array">{mappingHelper}</div>
                </div>
                <br />
                <button
                  className="submit-button-rhyme"
                  type="submit"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default Search;
