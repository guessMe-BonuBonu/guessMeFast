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
  const [maxPage, setMaxPage] = useState(7);
  const [url, setUrl] = useRecoilState(urlSave);

  const [name, setName] = useRecoilState(nameState);

  const navigate = useNavigate();

  const checkPost = async () => {
    console.log("answers : " + answers);
    console.log("question : " + questions);
    try {
      const response = await axios.post("http://27.96.131.106:9998/make-me", {
        name: name /*api 양식*/,
        questions: questions,
        answers: answers,
      });
      console.log(response);
      setUrl(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(url);

  useEffect(() => {
    console.log("answers = " + answers);
  }, [answers]);

  const saveInfo = (index, id) => {
    // const findId = dataSet.findIndex((item) => item.index === page);

    if (answers.length <= maxPage) {
      setAnswers([...answers, index]);
      setQuestions([...questions, id]);
    }

    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const check = () => {
    checkPost();
    navigate("/urlresult");
  };
  console.log(answers);
  console.log(questions);

  return (
    <div className={style.backImg}>
      <div className={style.topContainer}>
        <Progressbar page={page} />
        <div className={style.queDiv}>"{randomSubset[page].que}"</div>
      </div>

      <div className={style.bottomContainer}>
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
        {page === 7 && <button onClick={check}>확인</button>}

        <button
          onClick={(event) => {
            event.preventDefault();
            if (page > 0) setPage(page - 1);
          }}
        >
          왼쪽
        </button>
      </div>
    </div>
  );
}
