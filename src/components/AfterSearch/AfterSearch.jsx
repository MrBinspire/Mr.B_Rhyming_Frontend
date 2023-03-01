import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./AfterSearch.css";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AfterSearch = () => {
  const location = useLocation();
  const [addFlag, setAddFlag] = useState(false);
  const [searchWordOfTheDay, setSearchWordOfTheDay] = useState();
  const [searchFlag, setSearchFlag] = useState(false);
  const [inputArr, setInputArr] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [isRemoveClicked, setisRemoveClicked] = useState(false);
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //SEARCH FUNCTIONALITY FROM ANOTHER PAGE-----------------------------------
  useEffect(() => {
    if (location.state.searchArr.length > 0) {
      let reqWord = location.state.searchWord.toLowerCase();
      for (let i of location.state.searchArr) {
        let wordOfTheDayInList = i.Word_of_the_day.toLowerCase();
        let wordInList = i.word.toLowerCase();
        if (
          reqWord.replace(" ", "") === wordOfTheDayInList ||
          reqWord.replace(" ", "") === wordInList
        ) {
          setSearchFlag(true);
          setSearchWordOfTheDay(i.Word_of_the_day.toLowerCase());
          break;
        }
      }
    } else {
    }
  }, [location.state.searchArr, location.state.searchWord, searchWordOfTheDay]);

  //SUBMITTING NEW WORDS TO EXISTING DICTIONARY------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();
    setAddFlag(true);
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

    let new_arr = inputArr;
    new_arr.splice(req_index, 1);
    setInputArr((prev) => (prev = new_arr));
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
        Word_of_the_day: searchWordOfTheDay,
      };
      // let accessToken = authTokens.access
      let response = await fetch(
        "https://api.rhymes.world/api/add-after-search",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(item),
        }
      );
      if (response.ok) {
        console.log("The word has been submitted");
        notify();
      } else {
        console.log("something went wrong");
        notify2();
      }
    }
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
    setInputWord(e.target.value);
  };

  //SEARCHING FUNCTIONALITY FROM THE SAME PAGE---------------------------------------------
  const [searchingWord, setSearchingWord] = useState();
  const [searchingWOTD, setSearchingWOTD] = useState();
  const [searchingArr, setSearchingArr] = useState([]);
  const [searchingFlag, setSearchingFlag] = useState(false);
  const [flag, setflag] = useState(false);

  const searchingGet = (e) => {
    e.preventDefault();
    setflag(true);
    axios
      .get("https://api.rhymes.world/api/search-rhyming-words")
      .then((response) => {
        setSearchingArr(response.data);
        console.log(searchingArr);
      });
  };

  useEffect(() => {
    if (searchingArr.length > 0) {
      let req_word = searchingWord.toLowerCase();
      for (let i of searchingArr) {
        let wOTDInList = i.Word_of_the_day.toLowerCase();
        let wInList = i.word.toLowerCase();
        if (
          req_word.replace(" ", "") === wOTDInList ||
          req_word.replace(" ", "") === wInList
        ) {
          setSearchFlag(false);
          setSearchingFlag(true);
          setSearchingWOTD(wOTDInList);
          break;
        }
      }
    }
  }, [searchingArr, searchingWOTD, searchingWord, navigate]);

  return (
    <div className="after-search">
      <img src={img} alt="logo" />
      <div className="search-field">
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Search Rhyming words"
            className="searchWord-search"
          >
            <Icon
              icon={search}
              size={20}
              onClick={searchingGet}
              className="search-icon"
            />
            <Form.Control
              type="text"
              placeholder="Rhyming Word"
              name="searchWord"
              className="rhymingWord-search"
              value={searchingWord}
              onChange={(e) => {
                setSearchingWord(e.target.value);
                setSearchingArr([]);
                setSearchingWOTD("");
              }}
            />
          </FloatingLabel>
          <button
            type="submit"
            className="submit-button-search"
            onClick={searchingGet}
          >
            {/* Search */}
          </button>
        </Form>
      </div>
      {searchFlag ? (
        <h1 className="word-search">{location.state.searchWord}</h1>
      ) : (
        <h1 className="word-search">{searchingWord}</h1>
      )}

      {searchFlag ? (
        <>
          {location.state.flag && location.state.searchWord !== "" ? (
            <div>
              {searchWordOfTheDay !== location.state.searchWord ? (
                <span>{searchWordOfTheDay}</span>
              ) : (
                ""
              )}

              {location.state.searchArr.map((curElem) => {
                return (
                  <div key={curElem.id}>
                    {curElem.Word_of_the_day.toLowerCase() ===
                    searchWordOfTheDay ? (
                      <div>
                        {curElem.word.toLowerCase() !==
                        location.state.searchWord.replace(" ", "") ? (
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
        </>
      ) : (
        <>
          {searchingFlag ? (
            <>
              {flag && searchingWord !== "" ? (
                <div>
                  {searchingWOTD !== searchingWord ? (
                    <span>{searchingWOTD}</span>
                  ) : (
                    ""
                  )}

                  {searchingArr.map((curElem) => {
                    return (
                      <div key={curElem.id}>
                        {curElem.Word_of_the_day.toLowerCase() ===
                        searchingWOTD ? (
                          <div>
                            {curElem.word.toLowerCase() !==
                            searchingWord.replace(" ", "") ? (
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
            </>
          ) : (
            <>
              {console.log("--------------")}
              "No Words Found"
            </>
          )}
        </>
      )}

      {user ? (
        <div>
          <button className="add-button-as" onClick={submitHandler}>
            ADD
          </button>
        </div>
      ) : (
        <div className="add-more-before-login-text">
          <strong>Login to add more words</strong>
        </div>
      )}

      {addFlag ? (
        <div>
          <div className="add-more-word">
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
                {/* Add More */}
              </button>
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
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default AfterSearch;
