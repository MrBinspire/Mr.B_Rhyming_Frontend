import React from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Search.css";
import "../Input_page/HomeInputPage.css";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let [searchWord, setSearchWord] = useState("");
  let [searchArr, setSearchArr] = useState([]);
  const [searchWordOfTheDay, setsearchWordOfTheDay] = useState("");
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();

  const searchGet = (e) => {
    e.preventDefault();
    setflag(true);
    axios
      .get("https://api.rhymes.world/api/search-rhyming-words")
      .then((response) => {
        setSearchArr(response.data);
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
          break;
        }
      }
    }
  }, [searchArr, searchWord, flag]);

  let { wordOfDay, user } = useContext(AuthContext);
  const d = new Date();
  var day = d.toLocaleString("en-CA", { day: "2-digit" });
  var month = d.toLocaleString("en-CA", { month: "2-digit" });
  var year = d.toLocaleString("en-CA", { year: "numeric" });

  const today_date = year + "-" + month + "-" + day;

  let reqWord = "";
  for (let value of wordOfDay) {
    if (value["date"] === today_date) {
      reqWord = value["Word_of_the_day"];
    }
  }

  const enterRhymes = () => {
      alert("you need to login to input rhyming words")
      navigate("/login");
    
  };

  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="Home-WOTD">
        Today's Word Of The Day is:
        <div className="WOTD">{reqWord}</div>
      </div>
      {!user ? (
        <div className="enter-rhyming-words" onClick={enterRhymes}>
          Would you like to enter some rhyming words?
        </div>
      ) : (
        ""
      )}

      <div className="search">Search here for some rhyming words</div>
      <div className="search-word">
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Search Rhyming words"
            className="searchWord"
          >
            <Form.Control
              type="text"
              placeholder="Rhyming Word"
              name="searchWord"
              className="rhymingWord"
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
            Search
          </button>
        </Form>
        {flag && searchWord !== "" ? (
          <div>
            <span>{searchWordOfTheDay}</span>
            {searchArr.map((curElem) => {
              return (
                <div key={curElem.id}>
                  {/* {console.log(curElem.Word_of_the_day.toLowerCase())} */}
                  {/* {console.log(searchWordOfTheDay)} */}
                  {curElem.Word_of_the_day.toLowerCase() ===
                  searchWordOfTheDay ? (
                    <div>
                      {curElem.word.toLowerCase() !== searchWord ? (
                        <span>{curElem.word}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
