import React from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Search.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Search = () => {
  let [searchWord, setSearchWord] = useState("");
  let [searchArr, setSearchArr] = useState([]);
  const [searchWordOfTheDay, setsearchWordOfTheDay] = useState("");
  const [flag, setflag] = useState(false);

  const searchGet = (e) => {
    e.preventDefault();
    setflag(true);
    axios
      .get("http://137.184.193.17/api/search-rhyming-words")
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

  // if (flag) {
  //   setsearchWordOfTheDay("");
  //   setflag(!flag);
  // }

  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
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
