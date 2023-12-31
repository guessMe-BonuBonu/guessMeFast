import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import style from "./SolveQuestionPage.module.css";
import axios from "axios";
import Progressbar from "../Progressbar/Progressbar";
import { useRecoilState } from "recoil";
import { dataSet, randomSubset } from "../Data";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { myScore } from "../../recoils/Recoil";
import { useNavigate } from "react-router-dom";
export default function SolvePage() {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(10);
  const [answers, setAnswers] = useState([]);
  const [finalArr, setFinalArr] = useState([]);
  const [score, setScore] = useRecoilState(myScore);
  const navigate = useNavigate();
  const [checkState, setCheckState] = useState(false);
  const [scoreCheck, setScoreCheck] = useState(false);
  const [cnt, setCnt] = useState(0);
  // const [nameInputFlag, setnameInputFlag] = useState(true);

  const { uri } = useParams();
  console.log(uri);
  const saveInfo = (index) => {
    // const findId = dataSet.findIndex((item) => item.index === page);

    if (answers.length <= maxPage - 1) {
      setAnswers([...answers, index]);
    }

    if (page === maxPage - 1) {
      setCheckState(true);
    }
    if (page < maxPage - 1) {
      setPage(page + 1);
    }
  };
  const checkGet = async () => {
    try {
      const response = await axios.get(
        `https://bono-api.kro.kr:9998/find-me/${uri}`
      );

      console.log(response);
      if (response != "undefined" && response != null) {
        setFinalArr(response.data);
      }
    } catch (error) {
      console.error(error + "에러다");
    }
  };

  useEffect(() => {
    checkGet();
  }, []);

  useEffect(() => {
    if (checkState === true) {
      console.log("만든사람 answer :" + finalArr.answers);
      console.log("맞춘사람 answer : " + answers);
      for (let i = 0; i < finalArr.answers.length; i++) {
        if (finalArr.answers[i] === answers[i]) {
          setCnt((prevCnt) => prevCnt + 1);
        }
        if (finalArr.answers.length - 1 === i) {
          setScoreCheck(true);
          setCheckState(false);
        }
      }
    }
  }, [checkState]);

  useEffect(() => {
    setScore(cnt);
  }, [cnt]);
  useEffect(() => {
    if (scoreCheck === true) {
      navigate("/score");
    }
  }, [scoreCheck]);

  const A = finalArr?.questions || [];

  const arrIndex = A[page] - 1 || 0;

  // <div className={style.queDiv}>
  // {A && dataSet[arrIndex].que}
  // {/*처음엔 index 0이니까 dataSet[0]일거야 그 담엔 dataIndex 증가하면서 쭉쭉 받아오는 데이터마다 달라짐*/}
  //</div>

  const handleBackBtn = (e) => {
    e.preventDefault();
    if (page > 0) setPage(page - 1);
    answers.pop();
  };

  return (
    <div className={style.backImg}>
      <div className={style.topContainer}>
        <Progressbar page={page} />
        <div className={style.queContainer}>
          <div className={style.quotesImg1}></div>
          <div className={style.queDiv}>"{A && dataSet[arrIndex].que}"</div>
          <div className={style.quotesImg2}></div>
        </div>
      </div>

      <div className={style.bottomContainer}>
        <div className={style.leftBar}>
          <button onClick={handleBackBtn}></button>
        </div>
        <div className={style.BtnsContainer}>
          {A &&
            dataSet[arrIndex].ans.map((ans, index) => (
              <button
                className={style.selectBtn}
                style={{
                  marginTop: index === 0 ? "73px" : null,
                }}
                key={index}
                onClick={() => {
                  saveInfo(index);
                  // 버튼 클릭 시 정답 확인
                }}
              >
                {ans}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
