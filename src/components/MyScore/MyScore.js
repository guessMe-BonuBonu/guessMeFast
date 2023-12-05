import { answerState, questionState } from "../../recoils/Recoil";
import style from "./MyScore.module.css";
import { useRecoilValue } from "recoil";
export default function MyScore() {
  const answerScore = 0;
  const myValue = useRecoilValue(questionState);
  const myValue2 = useRecoilValue(answerState);
  console.log(questionState);
  return (
    <div className={style.Container}>
      <div className={style.ScoreBoard}>
        <div className={style.Top}>
          <div className={style.semiTop}>
            <div className={style.YouAndMe}>너와 나의 궁합은</div>
            <div className={style.score}>{answerScore}</div>
          </div>
          <div className={style.ScoreDiv}>100%</div>
          <div className={style.BtnDiv}>
            <button className={style.Btn}>내 퀴즈 만들기</button>
          </div>
        </div>
        <div className={style.topImg}>efe</div>
      </div>
    </div>
  );
}
