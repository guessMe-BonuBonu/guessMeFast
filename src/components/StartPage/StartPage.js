import "./StartPage.css";
import { useNavigate } from "react-router-dom";
const StartPage = () => {
  const handleButton = ()=>{
    navigator("/");
  }
  return (
    <div>
      <div className="top">
        <div className="box1"></div>
      </div>
      <div className="bottom">
        <button onClick={handleButton} className="quizButton">퀴즈 만들기</button>
        <div  className="arrowImg"></div>
      </div>

    </div>
  );
};

export default StartPage;
