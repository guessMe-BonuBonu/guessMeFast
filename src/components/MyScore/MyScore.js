import { answerState, questionState } from "../../recoils/Recoil";
import style from "./MyScore.module.css";
import { useRecoilValue } from "recoil";
import { myScore } from "../../recoils/Recoil";
export default function MyScore() {
  const answerScore = 0;
  const myValue = useRecoilValue(questionState);
  const myValue2 = useRecoilValue(answerState);

  const score = useRecoilValue(myScore);
  console.log(questionState);
  return (
    <div className={style.borderContainer}>
      <div className={style.Container}>
        <div className={style.ScoreBoard}>
          <div className={style.Top}>
            <div className={style.YouAndMe}>너와 나의 궁합은..?&nbsp;&nbsp;&nbsp; <span>{score}점!</span></div>
          </div>
          <div className={style.Middle}>
            <div className={style.ScoreDiv}>{score}0%</div>
          </div>
          <div className={style.Bottom}>
            <button className={style.scoreBtn}>내 순위 확인하기</button>
            <div className={style.makeBtnBox}>
              <div className={style.img1}></div>
              <button className={style.Btn}>내 퀴즈 만들기</button>
              <div className={style.img2}></div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}
