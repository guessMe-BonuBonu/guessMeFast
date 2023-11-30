import style from "./Progressbar.module.css";

const Progressbar = (prop) => {
  console.log("page=" + prop.page);
  const imgName =
    prop.page + 1 === 1
      ? style.progress1
      : prop.page + 1 === 2
      ? style.progress2
      : prop.page + 1 === 3
      ? style.progress3
      : prop.page + 1 === 4
      ? style.progress4
      : prop.page + 1 === 5
      ? style.progress5
      : prop.page + 1 === 6
      ? style.progress6
      : prop.page + 1 === 7
      ? style.progress7
      : style.progress8;
  return (
    <div className={style.container}>
      <div className={imgName}></div>
    </div>
  );
};

export default Progressbar;
