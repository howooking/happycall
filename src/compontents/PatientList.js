import { useContext, useState } from "react";
import Edit from "../pages/Edit";
import Record from "../pages/Record";

import Register from "../pages/Register";
import Button from "./Button";
import Preview from "./Preview";
import { PatientStateContext } from "../App";

export default function PatientList({
  todayList,
  registerModal,
  setRegisterModal,
  curDate,
  setCurDate,
  recordModal,
  setRecordModal,
  target,
  setTarget,
  editModal,
  setEditModal,
  searchName,
  setSearchName,
}) {
  const [idSortState, setIdSortState] = useState("등록순");
  const [isDoneState, setIsDoneState] = useState("모두");
  const todayListCopy = [...todayList];
  const patientList = useContext(PatientStateContext);

  const todayProcessedList = () => {
    const idCompare = (a, b) => {
      if (idSortState === "등록순") {
        return parseInt(a.id) - parseInt(b.id);
      } else {
        return parseInt(b.id) - parseInt(a.id);
      }
    };
    const isDoneFilteredList = () => {
      switch (isDoneState) {
        case "모두":
          return todayListCopy;
        case "완료":
          return todayListCopy.filter((it) => it.isDone === "완료");
        case "미완료":
          return todayListCopy.filter((it) => it.isDone === "미완료");
        default:
          return todayListCopy;
      }
    };
    return isDoneFilteredList().sort(idCompare);
  };

  const searchList = () => {
    const searchedList = searchName
      ? patientList.filter((it) => it.name === searchName)
      : [];

    const idCompare = (a, b) => {
      if (idSortState === "등록순") {
        return parseInt(a.id) - parseInt(b.id);
      } else {
        return parseInt(b.id) - parseInt(a.id);
      }
    };
    const isDoneFilteredList = () => {
      switch (isDoneState) {
        case "모두":
          return searchedList;
        case "완료":
          return searchedList.filter((it) => it.isDone === "완료");
        case "미완료":
          return searchedList.filter((it) => it.isDone === "미완료");
        default:
          return searchedList;
      }
    };
    return isDoneFilteredList().sort(idCompare);
  };

  return (
    <div className="PatientList">
      <div
        className="filterAndButton"
        style={
          registerModal || recordModal || editModal
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <select
          value={idSortState}
          onChange={(e) => setIdSortState(e.target.value)}
        >
          <option value="등록순">등록순</option>
          <option value="최신순">최신순</option>
        </select>
        <select
          value={isDoneState}
          onChange={(e) => setIsDoneState(e.target.value)}
        >
          <option value="모두">모두</option>
          <option value="완료">완료</option>
          <option value="미완료">미완료</option>
        </select>
        <Button
          text={"환 자 등 록"}
          type={"main"}
          onClick={() => {
            setRegisterModal(true);
            setSearchName("");
          }}
        />
      </div>
      {searchName
        ? searchList().map((it) => (
            <Preview
              key={it.id}
              {...it}
              registerModal={registerModal}
              setRecordModal={setRecordModal}
              target={target}
              setTarget={setTarget}
              recordModal={recordModal}
              editModal={editModal}
            />
          ))
        : todayProcessedList().map((it) => (
            <Preview
              key={it.id}
              {...it}
              registerModal={registerModal}
              setRecordModal={setRecordModal}
              target={target}
              setTarget={setTarget}
              recordModal={recordModal}
              editModal={editModal}
            />
          ))}

      {registerModal ? (
        <Register
          setRegisterModal={setRegisterModal}
          curDate={curDate}
          setCurDate={setCurDate}
        />
      ) : null}
      {recordModal ? (
        <Record
          target={target}
          setTarget={setTarget}
          setRecordModal={setRecordModal}
          setEditModal={setEditModal}
          editModal={editModal}
          setCurDate={setCurDate}
        />
      ) : null}
      {editModal ? (
        <Edit
          target={target}
          setEditModal={setEditModal}
          setCurDate={setCurDate}
          setRecordModal={setRecordModal}
        />
      ) : null}
    </div>
  );
}
