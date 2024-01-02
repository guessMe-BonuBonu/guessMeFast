import React from "react";
import style from "./QuestionPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Progressbar from "../Progressbar/Progressbar";
import { useRecoilState } from "recoil";
import { urlSave } from "../../recoils/Recoil";
import { useNavigate } from "react-router-dom";
import { nameState } from "../../recoils/Recoil";
import { randomSubset } from "../Data";
export default function QuestionPage() {
  const [info, setInfo] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(10);
  const [url, setUrl] = useRecoilState(urlSave);
  const [name, setName] = useRecoilState(nameState);
  const [checkState, setCheckState] = useState(false);
  const navigate = useNavigate();
  const checkPost = async () => {
    console.log("answers : " + answers);
    console.log("question : " + questions);

    if (answers.length === 10) {
      try {
        const response = await axios.post(
          "https://bono-api.kro.kr:9998/make-me",
          {
            name: name /*api 양식*/,
            questions: questions,
            answers: answers,
          }
        );
        console.log("q + " + questions);
        console.log(response);
        setUrl(response.data);
        setCheckState(false);
        navigate("/urlresult");
      } catch (error) {
        console.error(error);
      }
    }
  };
  console.log(url);

  useEffect(() => {
    console.log("answers = " + answers);
    if (answers.length === maxPage) {
      checkPost();
    }
  }, [answers]);

  const saveInfo = (index, id) => {
    // const findId = dataSet.findIndex((item) => item.index === page);

    if (answers.length <= maxPage - 1) {
      setAnswers([...answers, index]);
      setQuestions([...questions, randomSubset[page].id]);
    }

    if (page === maxPage) {
      setCheckState(true);
      // check();
    }

    if (page < maxPage - 1) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (checkState === true) checkPost();
  }, [checkState]);

  useEffect(() => {
    console.log("page=" + page);
  }, [page]);

  const moveToBackPage = (event) => {
    event.preventDefault();
    if (page > 0) {
      setPage(page - 1);
      questions.pop();
      answers.pop();
    }
  }

  return (
    <div className={style.backImg}>
      <div className={style.topContainer}>
        <Progressbar page={page} />
        <div className={style.queContainer}>
          <div className={style.quotesImg1}></div>
          <div className={style.queDiv}>"{randomSubset[page].que}"</div>
          <div className={style.quotesImg2}></div>
        </div>
      </div>

      <div className={style.bottomContainer}>
        <div className={style.leftBar}>
          <button
            className="leftBtn"
            onClick={moveToBackPage}
          ></button>
        </div>
        <div>
          {randomSubset[page].ans.map((ans, index) => (
            <button
              className={style.selectBtn}
              style={{
                marginTop: index === 0 ? "73px" : null,
              }}
              key={index}
              onClick={() => saveInfo(index, randomSubset[page].id)}
            >
              {ans}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
