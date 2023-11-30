import style from "./StartPage.module.css";
import { useNavigate } from "react-router-dom";
const StartPage = () => {
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
          퀴즈 만들기
        </button>
        <div className={style.arrowImg}></div>
      </div>
    </div>
  );
};

export default StartPage;
