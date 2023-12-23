import style from "./StartPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
const StartPage = () => {
  const navigator = useNavigate();
  const handleButton = () => {
    navigator("/getinfo");
  };
  const { id } = useParams();
  //get 요청을 날리면

  return (
    <div>
      <div className={style.top}>
        <div className={style.box1}></div>
      </div>
      <div className={style.bottom}>
        <div className={style.arrowBox}>
          <button onClick={handleButton} className={style.quizButton}>
            퀴즈 만들기
          </button>
          <div className={style.arrowImg}></div>
        </div>

      </div>
    </div>
  );
};

export default StartPage;
