import React from "react";
import { useState, useEffect } from "react";
import style from "./SolveQuestionPage.module.css";
import axios from "axios";
import Progressbar from "../Progressbar/Progressbar";
import { useRecoilState } from "recoil";
import { urlSave } from "../../recoils/Recoil";
import { useRecoilValue } from "recoil";
import { dataSet, randomSubset } from "../Data";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function SolvePage() {
  const [info, setInfo] = useState([]); //사용자가 문제 푼 index가 들어잇다
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(7);
  const [getUrl, setGetUrl] = useState();
  const value = useRecoilValue(urlSave);
  const [dataIndex, setDataIndex] = useState(0);

  const getData = {
    //실제 서버에서 받는 mockData
    name: "hee",
    questions: [1, 1, 2, 3, 4, 5, 6, 7],
    answers: [1, 2, 3, 4, 5, 6, 7, 8],
  };
  const { uri } = useParams();
  console.log(uri);
  const checkGet = async () => {
    try {
      const response = await axios.get(
        `http://27.96.131.106:9998/find-me/${uri}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkGet();
  }, []);

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
                // 버튼 클릭 시 정답 확인
              }}
            >
              {ans}
            </button>
          ))}
        </div>
        {page === 7 && (
          <Link to="/solve">
            <button>확인</button>
          </Link>
        )}
      </div>
    </div>
  );
}
