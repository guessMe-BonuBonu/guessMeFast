import React from "react";
import style from "./QuestionPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Progressbar from "../Progressbar/Progressbar";
import {useRecoilState} from "recoil";
import {urlSave} from "../../recoils/Recoil";
import { useNavigate } from "react-router-dom";
import {nameState} from "../../recoils/Recoil";

export default function QuestionPage() {
  const [info, setInfo] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [page,setPage]=useState(0);
  const [maxPage,setMaxPage]=useState(7);
  const [url,setUrl]=useRecoilState(urlSave);
  const [name,setName]=useRecoilState(nameState);

 

  const navigate=useNavigate();




  const checkPost = async () => {
    console.log("answers : " + answers);
    console.log("question : "+questions);
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

  const dataSet = [
    {
      id: 1,
      que: "리안의 공강은 몇일",
      ans: ["1일", "2~3일", "4일", "없음"],
    },
    {
      id: 2,
      que: "좋아하는 학식 메뉴는?",
      ans: ["세종대왕돈까스", "육회비빔밥", "소금구이덮밥", "쫑쫑덮밥"],
    },
    {
      id: 3,
      que: "나의 통학 시간은?",
      ans: ["~30분", "30분~1시간", "1시간~2시간", "2시간 이상"],
    },
    {
      id: 4,
      que: "나는 계획형일까 즉흥형일까",
      ans: ["계획형", "즉흥형"],
    },
    {
      id: 5,
      que: "좋아하는 영화 취향",
      ans: ["로맨스", "스릴러/공포", "판타지", "액션/코미디"],
    },
    {
      id: 6,
      que: "힘들 때 하는 일",
      ans: ["울기", "술마시기", "친구만나기", "게임하기"],
    },
    {
      id: 7,
      que: "내 혈액형은",
      ans: ["A형", "B형", "AB형", "O형"],
    },
    {
      id: 8,
      que: "내가 좋아하는 계절은",
      ans: ["봄", "여름", "가을", "겨울"],
    },
  ];
  useEffect(()=>{
    console.log("answers = " + answers);
  },[answers]);

  const saveInfo = (index) => {
    // const findId = dataSet.findIndex((item) => item.index === page);

    if(answers.length<=maxPage){
      setAnswers([...answers,index]);
      setQuestions([...questions,page]);
    }

    if(page<maxPage){
      setPage(page+1);
    }
    
  };

  const check = () => {
    checkPost();
    navigate("/urlresult");
  };

  return (
    <div className={style.backImg}>
      <div className={style.topContainer}>
        <Progressbar page={page}/>
        <div className={style.queDiv}>"{dataSet[page].que}"</div>
      </div>
      
      <div className={style.bottomContainer}>
        
        <div>
          {dataSet[page].ans.map((ans, index) => (
            <button
              className={style.selectBtn}
              style={{
                marginTop: index === 0 ? "73px" : null,
              }}
              key={index}
              onClick={() => saveInfo(index)}
            >
              {ans}
            </button>
          ))}
        </div>
        <button onClick={check}>확인</button>
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
