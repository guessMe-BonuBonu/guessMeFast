import { answerState, questionState } from "../../recoils/Recoil";
import style from "./MyScore.module.css";
import { useRecoilValue } from "recoil";
import { myScore } from "../../recoils/Recoil";
import { urlSave } from "../../recoils/Recoil";
import { Link } from "react-router-dom";
import { solveNameState } from "../../recoils/Recoil";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function MyScore() {
  const answerScore = 0;
  const myValue = useRecoilValue(questionState);
  const myValue2 = useRecoilValue(answerState);
  const name = useRecoilValue(solveNameState);
  const url = useRecoilValue(urlSave);
  const score = useRecoilValue(myScore);
  console.log(questionState);
  console.log(name, url, score);
  const checkGet = async () => {
    // 서버에서 랜덤생성된 URI로 받아오는 axios
    try {
      const encodedName = encodeURIComponent(name);
      const encodedScore = encodeURIComponent(score);

      const response = await axios.post(
        `https://bono-api.kro.kr:9998/result/${url}?name=${encodedName}&score=${encodedScore}`,
        {
          code: url /* API 양식 */,
        }
      );
      console.log(response); // 추후에 지우기
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkGet();
  }, []);

  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("/");
  }
  const moveToLank = () => {
    navigate("/rank/" + url);
  }
  return (
    <div className={style.borderContainer}>
      <div className={style.Container}>
        <div className={style.ScoreBoard}>
          <div className={style.Top}>
            <div className={style.YouAndMe}>
              너와 나의 궁합은..?&nbsp;&nbsp;&nbsp; <span>{score}점!</span>
            </div>
          </div>
          <div className={style.Middle}>
            <div className={style.ScoreDiv}>
              {score === 0 ? (
                <div className={style.scoreContent}>0%</div>
              ) : (
                <div className={style.scoreContent}>{score}0%</div>
              )}
            </div>
          </div>
          <div className={style.Bottom}>
            <button className={style.scoreBtn} onClick={moveToLank}>내 순위 확인하기</button>

            <div className={style.makeBtnBox}>
              <div className={style.img1}></div>
              <button className={style.Btn} onClick={moveToHome}>내 퀴즈 만들기</button>
              <div className={style.img2}></div>
            </div>
          </div>
        </div>
        <div className={style.line}></div>
      </div>
    </div>
  );
}
