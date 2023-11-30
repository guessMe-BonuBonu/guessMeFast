import React from "react";
import { useState, useEffect } from "react";
import style from "./SolveQuestionPage.module.css";
import axios from "axios";
import Progressbar from "../Progressbar/Progressbar";
import { useRecoilState } from "recoil";
import { urlSave } from "../../recoils/Recoil";
import { useRecoilValue } from "recoil";
import { dataSet, randomSubset } from "../Data";
export default function SolvePage() {
  const [info, setInfo] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(7);
  const [getUrl, setGetUrl] = useState();
  const value = useRecoilValue(urlSave);
  const [dataIndex, setDataIndex] = useState(0);
  const checkGet = async () => {
    //서버에서 랜덤생성된 uri로 받아오는 axios
    try {
      const response = await axios.get(
        `http://27.96.131.106:9998/find-me/${value}`
      );
      console.log(response); //추후에 지우기
      setGetUrl(response);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(value); //recoil로 uri 찍는 부분

  useEffect(() => {
    checkGet();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const getData = {
    //실제 서버에서 받는 mockData
    name: "hee",
    questions: [1, 1, 2, 3, 4, 5, 6, 7],
    answers: [1, 2, 3, 4, 5, 6, 7, 8],
  };

  useEffect(() => {
    //answer 배열 이 변경될때마다 콘솔에 찍
    console.log("answers = " + answers);
  }, [answers]);

  const saveInfo = (index) => {
    //index 를 받아오고 그걸 answer 배열에 넣겠다.
    if (answers.length <= maxPage) {
      setAnswers([...answers, index]);
      setQuestions([...questions, page]);
    }

    if (page < maxPage) {
      setPage(page + 1);
      setDataIndex(dataIndex + 1);
    }
  };
  console.log(info);
  const removeLastIndex = () => {
    setInfo((prevInfo) => {
      // 배열의 마지막 요소를 삭제한 새로운 배열을 반환
      const newInfo = [...prevInfo];
      newInfo.pop();
      return newInfo;
    });
  };
  console.log(randomSubset);
  return (
    <div className={style.backImg}>
      <div className={style.topContainer}>
        <Progressbar page={page} />
        <div className={style.queDiv}>
          "{dataSet[getData.questions[page]].que}"{" "}
          {/*처음엔 index 0이니까 dataSet[0]일거야 그 담엔 dataIndex 증가하면서 쭉쭉 받아오는 데이터마다 달라짐*/}
        </div>
      </div>

      <div className={style.bottomContainer}>
        <div className={style.leftBar}>
          <button
            className="leftBtn"
            onClick={(event) => {
              event.preventDefault();
              removeLastIndex();
              if (page > 0) setPage(page - 1);
            }}
          ></button>
        </div>
        <div>
          {dataSet[getData.questions[page]].ans.map((ans, index) => (
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
        {page === 7 && <button>확인</button>}
      </div>
    </div>
  );
}
