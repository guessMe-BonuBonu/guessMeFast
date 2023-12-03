import style from "./UrlResultPage.module.css";
import tagImg from "../../img/tagImg.png";
import arrowing2 from "../../img/arrowImg2.png";
import { urlSave } from "../../recoils/Recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { nameState } from "../../recoils/Recoil";
import { urlGet } from "../../recoils/Recoil";
import { useEffect } from "react";
import axios from "axios";
const UrlResultPage = () => {
  const [name, setName] = useRecoilState(nameState);

  const url = useRecoilValue(urlSave);

  // console.log("urlname : "+name);
  const handleCopyClipBoard = async (text) => {
    if (urlSave !== "") {
      try {
        await navigator.clipboard.writeText(text);
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
        `http://27.96.131.106:9998/find-me/${url}`
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
              {"["}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {"]"}
              <br />
              {/* {`[  ${nbsp} ${name}  ]`}<br/> */}
              퀴즈가 완성되었습니다!
            </div>
            <div className={style.urlDiv}>
              <p className={style.urlP}> http://kr.vonvon.me/{url}</p>
            </div>
          </div>
          <div className={style.bottomContainer}>
            <p className={style.fontDiv2}>
              친구에게 공유해 우정을 테스트 하세요
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className={style.copyBtn}
                onClick={() => handleCopyClipBoard(`${url}`)}
              >
                URL 링크 복사
              </button>
            </div>
            <img
              src={arrowing2}
              style={{ width: "7vw", position: "fixed", marginLeft: "18%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlResultPage;