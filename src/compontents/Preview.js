import { useContext } from "react";
import { OnActionContext } from "../App";
import Button from "./Button";

export default function Preview({
  id,
  name,
  date,
  number,
  cc,
  improve,
  memo,
  isDone,
  registerModal,
  recordModal,
  setRecordModal,
  editModal,
  setTarget,
}) {
  const { cancelDone, doDone } = useContext(OnActionContext);
  return (
    <div
      className={["Preview", `Preview_${isDone}`].join(" ")}
      style={
        registerModal || recordModal || editModal
          ? { display: "none" }
          : { display: "flex" }
      }
    >
      <div
        className={[
          "improve_img_wrapper",
          `improve_img_wrapper_${improve}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/improve${improve}.png`}
          alt="improve"
        />
      </div>
      <div className="info_wrapper">
        <div className="info_0">{`${new Date(date).getFullYear()}.${
          new Date(date).getMonth() + 1
        }.${new Date(date).getDate()}`}</div>
        <div className="info_1">{`${name}(${number})`}</div>
        <div className="info_2">{cc}</div>
        <div className="info_3">
          {memo.length < 20 ? memo : `${memo.slice(0, 20)}...`}
        </div>
      </div>
      <div className="button_wrapper">
        {isDone === "완료" ? (
          <>
            <Button text={"취소"} type={"sub"} onClick={() => cancelDone(id)} />
            <Button
              text={"보기"}
              onClick={() => {
                setRecordModal(true);
                setTarget(id);
              }}
            />
          </>
        ) : (
          <>
            <Button text={"완료"} type={"main"} onClick={() => doDone(id)} />
            <Button
              text={"보기"}
              onClick={() => {
                setRecordModal(true);
                setTarget(id);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
