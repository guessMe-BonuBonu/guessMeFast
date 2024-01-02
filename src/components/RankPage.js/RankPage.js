import style from "./RankPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function RankPage() {
  const [rankArr, setRankArr] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const { uri } = useParams();

  const RankGet = async () => {
    try {
      const response = await axios.get(
        `https://bono-api.kro.kr:9998/${uri}/rank`
      );

      console.log(response);
      if (response && response.data) {
        setRankArr(response.data);
        setDataFetched(true);
      }
    } catch (error) {
      console.error(error + "에러다");
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      RankGet();
    }
  }, [dataFetched]);

  console.log(rankArr);

  return (
    <div className={style.container}>
      <div className={style.whiteDiv}>
        {rankArr.map((item, index) => (
          <div
            className={`${style.rankerBlock} ${
              index === 0 ? style.firstRankerBlock : ""
            }`}
            key={index}
          >
            <div className={style.RankerInnerBox}>
              <div className={style.imgDiv}>
                {item.rank === 1 && <div className={style.rankImg1} />}
                {item.rank === 2 && <div className={style.rankImg2} />}
                {item.rank === 3 && <div className={style.rankImg3} />}
                {item.rank !== 1 && item.rank !== 2 && item.rank !== 3 && (
                  <div className={style.rankImg} />
                )}
              </div>
              <div className={style.rankDiv}>
                <div className={style.rank}>{item.rank}등</div>
              </div>
              <div className={style.nameDiv}>
                <div className={style.name}>
                  {item.name != null ? item.name : null}
                </div>
              </div>
              <div className={style.scoreDiv}>
                {item.score === 0 ? (
                  <div className={style.score}>0/10</div>
                ) : (
                  <div className={style.score}>{item.score}/10</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
