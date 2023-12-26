import style from "./SolveGetInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { solveNameState } from "../../recoils/Recoil";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SolveUrl } from "../../recoils/Recoil";
const SolveGetInfo = () => {
  const [name, setName] = useRecoilState(solveNameState);
  const [nameInput, setNameInput] = useState("");
  const navigator = useNavigate();
  const { uri } = useParams();

  const handleButton = () => {
    setName(nameInput);
    console.log("uri = " + uri)
    if (nameInput !== "")
      navigator("/solve/" + uri);
    else {
      alert("이름을 입력해 주세요!");
    }
  }


  console.log(uri);

  const nameInputChange = (e) => {
    setNameInput(e.target.value);
  }
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.nameInsertImg}></div>
        <input onChange={nameInputChange} placeholder="입력" type="text" className={style.inputBox} />
      </div>
      <div className={style.bottom}>
        <button onClick={handleButton} className={style.checkButton}>
          확인
        </button>
      </div>
    </div>

  );
}

export default SolveGetInfo;