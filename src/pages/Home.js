import { useContext, useEffect, useRef, useState } from "react";
import { PatientStateContext } from "../App";
import Button from "../compontents/Button";
import Header from "../compontents/Header";
import PatientList from "../compontents/PatientList";

export default function Home() {
  const [target, setTarget] = useState("");
  const [registerModal, setRegisterModal] = useState(false);
  const [recordModal, setRecordModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchName, setSearchName] = useState("");
  const searchInput = useRef();

  // Data
  const patientList = useContext(PatientStateContext);

  // Date
  const [curDate, setCurDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth() + 1;
  const curDay = curDate.getDate();

  const changeDate = () => {
    if (selectedDate) {
      const selectedYear = selectedDate.slice(0, 4);
      const selectedMonth = selectedDate.slice(5, 7);
      const selectedDay = selectedDate.slice(8, 12);
      setCurDate(new Date(selectedYear, selectedMonth - 1, selectedDay));
    }
  };
  useEffect(() => {
    changeDate();
  }, [selectedDate]);

  const decreseDay = () => {
    setCurDate(new Date(curYear, curMonth - 1, curDay - 1));
    setSearchName("");
  };
  const increseDay = () => {
    setCurDate(new Date(curYear, curMonth - 1, curDay + 1));
    setSearchName("");
  };

  //TodayList
  const [todayList, setTodayList] = useState([]);
  useEffect(() => {
    if (patientList.length >= 1) {
      const startOfDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate()
      ).getTime();
      const endOfDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate(),
        23,
        59,
        59
      ).getTime();
      setTodayList(
        patientList.filter((it) => startOfDay <= it.date && it.date <= endOfDay)
      );
    }
  }, [patientList, curDate]);

  return (
    <div className="Home">
      <Header
        left={<Button text={"<"} onClick={decreseDay} />}
        center={
          <div className="center_wrapper">
            <div className="calendar">
              <input
                type="date"
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSearchName("");
                }}
              />
            </div>
            <div>{`${curYear}.${curMonth}.${curDay}`}</div>
            <div className="search_wrapper">
              <input
                ref={searchInput}
                className={isSearch ? "wide" : "narrow"}
                placeholder={isSearch ? "검색(이름)" : null}
                onFocus={() => setIsSearch(true)}
                onBlur={() => {
                  setIsSearch(false);
                }}
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />
              <span
                className={isSearch ? "hide" : "show"}
                onClick={() => {
                  setIsSearch(true);
                  searchInput.current.focus();
                }}
              >
                🔍
              </span>
              {/* <button className={isSearch ? "show" : "hide"}>🔍</button> */}
            </div>
          </div>
        }
        right={<Button text={">"} onClick={increseDay} />}
        registerModal={registerModal}
        recordModal={recordModal}
        editModal={editModal}
      />
      <PatientList
        todayList={todayList}
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        curDate={curDate}
        setCurDate={setCurDate}
        recordModal={recordModal}
        setRecordModal={setRecordModal}
        target={target}
        setTarget={setTarget}
        editModal={editModal}
        setEditModal={setEditModal}
        searchName={searchName}
        setSearchName={setSearchName}
      />
    </div>
  );
}
