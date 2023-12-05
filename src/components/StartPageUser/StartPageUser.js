import style from "./StartPageUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
const StartPageUser = () => {
  const navigator = useNavigate();
  const handleButton = () => {
    navigator("/getinfo");
  };

  return (
    <div>
      <div className={style.top}>
        <div className={style.box1}></div>
      </div>
      <div className={style.bottom}>
        <button onClick={handleButton} className={style.quizButton}>
          문제 풀러 가기
        </button>
        <div className={style.arrowImg}></div>
      </div>
    </div>
  );
};

export default StartPageUser;
