import style from "./UrlResultPage.module.css";
import tagImg from "../../img/tagImg.png";
import { urlSave } from "../../recoils/Recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { nameState } from "../../recoils/Recoil";
import { urlGet } from "../../recoils/Recoil";
import { useEffect } from "react";
import axios from "axios";
const UrlResultPage = () => {
  const name = useRecoilValue(nameState);

  const url = useRecoilValue(urlSave);

  const handleCopyClipBoard = async (text) => {
    if (urlSave !== "") {
      try {
        await navigator.clipboard.writeText(
          "https://dukm-33bf4.web.app/#/" + "solveGetInfo/" + text
        );
        alert("클립보드에 링크가 복사되었어요.");
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(url);
  const checkGet = async () => {
    //서버에서 랜덤생성된 uri로 받아오는 axios
    try {
      const response = await axios.get(
        `https://bono-api.kro.kr:9998/find-me/${url}`
      );
      console.log(response); //추후에 지우기
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkGet();
  }, []);

  //font 같은거만 빼서 className주기
  return (
    <div className={style.container}>
      <div className={style.backgroundImg}>
        <img src={tagImg} className={style.tagImg} />
        <div className={style.middleBackground}>
          <div className={style.topContainer}>
            <div className={style.fontDiv}>
              {"["}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <span style={{ fontWeight: "700" }}>{name}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {"]"}
              <br />
              퀴즈가 완성되었습니다!
            </div>
            <div className={style.urlDiv}>
              <p className={style.urlP}>
                {" "}
                https://dukm-33bf4.web.app/#/solveGetInfo/{url}
              </p>
            </div>
          </div>
          <div className={style.bottomContainer}>
            <p className={style.fontDiv2}>
              친구에게 공유해 우정을 테스트 하세요
            </p>
            <div className={style.bottom}>
              <div className={style.arrow2Img}></div>
              <button
                className={style.copyBtn}
                onClick={() => handleCopyClipBoard(`${url}`)}
              >
                URL 링크 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlResultPage;
