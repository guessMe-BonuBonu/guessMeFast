import style from "./UrlResultPage.module.css";
import tagImg from "../../img/tagImg.png";
import { urlSave } from "../../recoils/Recoil";
import { useRecoilValue } from "recoil";
const UrlResultPage=()=>{

    const url=useRecoilValue(urlSave);
    const handleCopyClipBoard = async (text) => {
        if(urlSave!==""){
            try {
                await navigator.clipboard.writeText(text);
                alert("클립보드에 링크가 복사되었어요.");
            } catch (err) {
                console.log(err);
            }
        }
       
    };

    return(
        <div className={style.container}>
                <div className={style.backgroundImg}>
                <img src={tagImg} className={style.tagImg}/>
                    <div className={style.middleBox}>
                        {url}
                    </div>
                    <button onClick={()=>handleCopyClipBoard(`${url}`)}>URL 링크 복사</button>
                </div>
        </div>
    );
}

export default UrlResultPage;