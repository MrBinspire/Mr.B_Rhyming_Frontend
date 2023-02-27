import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./AfterSearch.css";
import img from "../../images/Mr.B.png";
import { set } from "react-ga";
import { FloatingLabel, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

const AfterSearch = () => {
  const location = useLocation();
  const [addFlag, setAddFlag] = useState(false);
  const [searchWordOfTheDay, setSearchWordOfTheDay] = useState();
  const [searchFlag, setSearchFlag] = useState(false);
  const [inputArr, setInputArr] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [isRemoveClicked, setisRemoveClicked] = useState(false);
  let { user } = useContext(AuthContext);

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
          console.log(searchWordOfTheDay);
          setSearchWordOfTheDay(i.Word_of_the_day.toLowerCase());
          break;
        }

        console.log("----------------");
      }
    }
  }, [
    location.state.searchArr,
    location.state.searchWord,
    searchWordOfTheDay,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    setAddFlag(true);
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

  let wordInput = async (e) => {
    for (let word in inputArr) {
      if (inputArr[word].inputWord === "") {
        continue;
      }
      let item = {
        user: user.username,
        word: inputArr[word].inputWord,
        Word_of_the_day: searchWordOfTheDay,
      };
      console.log(user.username);
      console.log(inputArr[word].inputWord);
      console.log(searchWordOfTheDay);
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
      } else {
        console.log("something went wrong");
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

  return (
    <div className="after-search">
      <div>
        <img src={img} alt="logo" />
      </div>

      <h1 className="word-search">{location.state.searchWord}</h1>
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
                    {console.log(curElem)}
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
        "No Words found"
      )}
      <div>
        <button className="add-button-as" onClick={submitHandler}>
          ADD
        </button>
      </div>
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
                disabled={inputArr !== [] ? false : true}
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AfterSearch;
