import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f7c9c9;
  font-family: "Single Day";
  height: 100vh;
  width: 100vw;
  .whiteDiv {
    width: 80%;
    height: 80%;
    background-color: white;
    padding: 20px;
    margin-top: 20px;
  }
  .rankerBlock {
    display: flex;
    padding: 20px;
    border: solid #f7c9c9;
    border-radius: 15px;
    justify-content: space-between;
    align-items: center;
    div {
      padding: 10px;
      border-radius: 20px;
    }
    img {
      width: 120px;
    }
    font-size: 60px;
  }
  .rank {
    width: fit-content;
    height: fit-content;
  }
  .jjuri {
    display: flex;
    flex-direction: row;
    div {
      margin-left: 30px;
    }
  }

  @media (max-width: 800px) {
    .rankerBlock {
      display: flex;
      padding: 10px;
      border: solid #f7c9c9;
      border-radius: 15px;
      justify-content: space-between;
      align-items: center;
      div {
        padding: 5px;
        border-radius: 20px;
      }
      img {
        width: 80px;
      }
      font-size: 20px;
    }
    .jjuri {
      display: flex;
      flex-direction: column;
      div {
        margin-left: 30px;
      }
    }
  }
`;

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
    <StyledDiv>
      <div className="whiteDiv">
        {rankArr.map((item, index) => (
          <div key={index} className="rankerBlock">
            {index === 0 && <img src="bono1.jpg" alt="1등 사진" />}
            {index === 1 && <img src="bono2.jpg" alt="2등 사진" />}
            {index === 2 && <img src="bono3.jpg" alt="3등 사진" />}
            {index === 3 && <img src="bono4.jpg" alt="4등 사진" />}
            <div className="jjuri">
              <div className="rank">{index + 1}등</div>
              <div className="name">{item.name != null ? item.name : null}</div>
              <div className="score">{item.score}0%의 궁합이에욧!</div>
            </div>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
}
