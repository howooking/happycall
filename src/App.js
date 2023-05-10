import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Record from "./pages/Record";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Edit from "./pages/Edit";

export const PatientStateContext = React.createContext();
export const OnActionContext = React.createContext();

function App() {
  //Data
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("patient")) || []
  );

  useEffect(() => {
    localStorage.setItem("patient", JSON.stringify(data));
  }, [data]);

  //dummy json placeholder by json server
  // const getData = async () => {
  //   const res = await fetch("http://localhost:2000/patient").then((res) =>
  //     res.json()
  //   );
  //   setData(res);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  //OnAction function
  const onCreate = (newDate, newName, newNumber, newCc, newMeno) => {
    const MaxID = data.length > 0 ? Math.max(...data.map((it) => it.id)) : -1;
    const strToTime = (newDate) => {
      const strYear = newDate.slice(0, 4);
      const strMonth = newDate.slice(5, 7);
      const strDay = newDate.slice(8, 12);
      return new Date(strYear, strMonth - 1, strDay).getTime();
    };
    const newData = {
      id: parseInt(MaxID) + 1,
      name: newName,
      number: newNumber,
      cc: newCc,
      improve: 3,
      memo: newMeno,
      date: strToTime(newDate),
      isDone: "미완료",
    };
    setData([...data, newData]);
  };

  const onRecord = (targetId, newImprove, newMemo) => {
    setData(
      data.map((it) =>
        parseInt(it.id) === parseInt(targetId)
          ? { ...it, improve: newImprove, memo: newMemo, isDone: "완료" }
          : it
      )
    );
  };

  const onEdit = (targetId, newDate, newName, newNumber, newCc, newMemo) => {
    const strToTime = (newDate) => {
      const strYear = newDate.slice(0, 4);
      const strMonth = newDate.slice(5, 7);
      const strDay = newDate.slice(8, 12);
      return new Date(strYear, strMonth - 1, strDay).getTime();
    };
    setData(
      data.map((it) =>
        parseInt(it.id) === parseInt(targetId)
          ? {
              ...it,
              date: strToTime(newDate),
              name: newName,
              number: newNumber,
              cc: newCc,
              memo: newMemo,
            }
          : it
      )
    );
  };

  const cancelDone = (targetId) => {
    setData(
      data.map((it) =>
        parseInt(it.id) === parseInt(targetId)
          ? { ...it, isDone: "미완료" }
          : it
      )
    );
  };
  const doDone = (targetId) => {
    setData(
      data.map((it) =>
        parseInt(it.id) === parseInt(targetId) ? { ...it, isDone: "완료" } : it
      )
    );
  };

  const onDelete = (targetId) => {
    setData(data.filter((it) => parseInt(it.id) !== parseInt(targetId)));
  };

  return (
    <PatientStateContext.Provider value={data}>
      <OnActionContext.Provider
        value={{ onCreate, onRecord, cancelDone, doDone, onDelete, onEdit }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/record/:id" element={<Record />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </OnActionContext.Provider>
    </PatientStateContext.Provider>
  );
}

export default App;
