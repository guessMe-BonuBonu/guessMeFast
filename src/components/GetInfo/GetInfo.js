import style from "./GetInfo.module.css";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import { nameState } from "../../recoils/Recoil";
import { useState } from "react";
const GetInfo=()=>{
    const [name,setName]=useRecoilState(nameState);
    const [nameInput,setNameInput]=useState("");
    const navigator=useNavigate();
    const handleButton=()=>{
        // console.log("name : "+nameInput);
        setName(nameInput);
        navigator("/question");
    }
    const nameInputChange=(e)=>{
        setNameInput(e.target.value);
    }
    return (
    <div className={style.container}>
      <div className={style.top}>
      <div className={style.nameInsertImg}></div>
        <input onChange={nameInputChange} placeholder="입력" type="text" className={style.inputBox}/>
      </div>
      <div className={style.bottom}>
        <button onClick={handleButton} className={style.checkButton}>
          확인
        </button>
        {/* <div className="arrowImg"></div> */}
      </div>
    </div>
     
    );
}

export default GetInfo;