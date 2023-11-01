import React from "react";
import "./QuestionPage.css";
import {useState,useEffect} from 'react';
import axios  from "axios";
function QuestionPage() {
  const [info,setInfo]=useState([]);
  const [QuestionId,setQuestionId]=useState(0);
  const [questions,setQuestions]=useState([]);
  const [answers,setAnswers]=useState([]);
  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem('info'))||[];
    setInfo(storedData);
    const storedQuestionId = JSON.parse(localStorage.getItem('questionId'))||0;
    setQuestionId(storedQuestionId);
    
  },[]);
  useEffect(()=>{
    localStorage.setItem('questionId',QuestionId);
  },[QuestionId]);
  
  const checkPost = async()=>{
    try{
      const response=await axios.post("http://27.96.131.106:9998/make-me",{
        name: "hee",/*api 양식*/
        questions: [1,2,3,4,5,6,4,8],
        answers: [0,1,2,3,4,5,9,2],
      });
      console.log(response);
    }catch(error){
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
      ans: ["로맨스", "스릴러/공포","판타지","액션/코미디"],
    },
    {
      id: 6,
      que: "힘들 때 하는 일",
      ans: ["울기", "술마시기","친구만나기","게임하기"],
    },
    {
      id: 7,
      que: "내 혈액형은",
      ans: ["A형", "B형", "AB형","O형"],
    },
    {
      id: 8,
      que: "내가 좋아하는 계절은",
      ans: ["봄", "여름","가을","겨울"],
    },
  ];
  const saveInfo=(index)=>{
    
    const findId=info.findIndex(item=>item.index===QuestionId);
     console.log(QuestionId);
    if(findId!==-1){
      const storedData=JSON.parse(localStorage.getItem('Info'))||[];
      storedData[QuestionId]={index:QuestionId,answer:index};
      localStorage.setItem('Info',JSON.stringify(storedData));
    }
    else{
      const newItem={index: QuestionId,answer:index};
      const updatedArray=[...info,newItem];
      setInfo(updatedArray);
      localStorage.setItem('Info',JSON.stringify(updatedArray));
    }
    if(QuestionId<7)setQuestionId((QuestionId)=>QuestionId+1);
   
  }

  const check=()=>{
  console.log(localStorage.getItem('Info'));
  setQuestions(info.map(item=>item.index));
  setAnswers(info.map(item=>item.answer));
   checkPost();
}

  return (
    <div className="backImg">
      
      <div className="questionBottom">
        <div>
          {dataSet[QuestionId].que}
        </div>
        <div>
          {dataSet[QuestionId].ans.map((ans, index) => (
            <button 
              style={{
                marginTop: index === 0 ? "73px" : null,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#96A9D1",
                width: "606px",
                borderRadius: "90px",
                height: "90px",
                marginBottom: "25px",
                boxShadow: "2px 2px 2px 2px gray",
              }}
              key={index}
              onClick={()=>saveInfo(index)}
            >
              {ans}
            </button>
          ))}
        </div>
        <button onClick={check}>확인</button>
      <button onClick={(event)=>{
        event.preventDefault();
        if(QuestionId>0)setQuestionId(QuestionId-1)
        }}>왼쪽</button>
      
      </div>
      
    </div>
  );
}

export default QuestionPage;
