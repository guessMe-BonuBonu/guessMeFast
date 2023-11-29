import style from "./UrlResultPage.module.css";
import tagImg from "../../img/tagImg.png";
import { urlSave } from "../../recoils/Recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { nameState } from "../../recoils/Recoil";
import { urlGet } from "../../recoils/Recoil";
import { useEffect } from "react";
import axios from "axios";
const UrlResultPage = () => {
  const [name, setName] = useRecoilState(nameState);
  const [geturl, setGetUrl] = useRecoilState(urlGet);
  const url = useRecoilValue(urlSave);
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
    try {
      const response = await axios.get(
        `http://27.96.131.106:9998/find-me/${url}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkGet();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  console.log(geturl);
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
  );
};

export default UrlResultPage;