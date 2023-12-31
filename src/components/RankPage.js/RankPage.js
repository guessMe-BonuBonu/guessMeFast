import styled from "styled-components";
import style from "./RankPage.module.css";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export function RankPage() {
  const [rankArr, setRankArr] = useState([]);

  const { uri } = useParams();
  const RankGet = async () => {
    try {
      const response = await axios.get(
        `https://bono-api.kro.kr:9998/${uri}/rank`
      );

      console.log(response);
      if (response != "undefined" && response != null) {
        setRankArr(response.data);
      }
    } catch (error) {
      console.error(error + "에러다");
    }
  };

  useEffect(() => {
    RankGet();
  }, []);
  console.log(rankArr);


  return (
    <div className={style.container}>
      <div className={style.whiteDiv}>
        {rankArr.map((item) => (
          <div className={style.rankerBlock}>
            <div className={style.RankerInnerBox}>
              <div className={style.imgDiv}>
                {item.rank === 1 && <div className={style.rankImg1} />}
                {item.rank === 2 && <div className={style.rankImg2} />}
                {item.rank === 3 && <div className={style.rankImg3} />}
                {item.rank !== 1 && item.rank !== 2 && item.rank !== 3 && <div className={style.rankImg} />}
              </div><div className={style.rank}>{item.rank}등</div>
              <div className0={style.name}>{item.name != null ? item.name : null}</div>
              {item.score === 0 ? (
                <div className={style.score}>0%</div>
              ) : (
                <div className={style.score}>{item.score}0%</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

