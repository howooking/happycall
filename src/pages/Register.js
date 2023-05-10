import { useContext, useEffect, useRef, useState } from "react";
import { OnActionContext } from "../App";
import Button from "../compontents/Button";
import Footer from "../compontents/Footer";
import Header from "../compontents/Header";
import { getStringDate } from "../util/getStringDate";

export default function Register({
  isEdit,
  seletedIdData,
  setRegisterModal,
  curDate,
  setCurDate,
  setEditModal,
  setRecordModal,
}) {
  const { onCreate, onEdit } = useContext(OnActionContext);

  //States
  const [states, setStates] = useState({
    date: getStringDate(new Date(curDate)),
    name: "",
    number: "",
    cc: "",
    memo: "",
  });

  useEffect(() => {
    if (isEdit) {
      setStates({
        date: getStringDate(new Date(parseInt(seletedIdData.date))),
        name: seletedIdData.name,
        number: seletedIdData.number,
        cc: seletedIdData.cc,
        memo: seletedIdData.memo,
      });
    }
  }, [isEdit, seletedIdData]);

  //Refs
  const nameInput = useRef();
  const numberInput = useRef();
  const ccInput = useRef();

  const handleOnChange = (e) => {
    setStates({
      ...states,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = () => {
    if (states.name.length < 1) {
      nameInput.current.focus();
      return;
    }
    if (states.number.length < 1) {
      numberInput.current.focus();
      return;
    }
    if (states.cc.length < 1) {
      ccInput.current.focus();
      return;
    }
    if (!isEdit) {
      onCreate(states.date, states.name, states.number, states.cc, states.memo);
      setRegisterModal(false);
      setCurDate(
        new Date(
          states.date.slice(0, 4),
          states.date.slice(5, 7) - 1,
          states.date.slice(8, 12)
        )
      );
    } else {
      onEdit(
        seletedIdData.id,
        states.date,
        states.name,
        states.number,
        states.cc,
        states.memo
      );
      setEditModal(false);
      setCurDate(
        new Date(
          states.date.slice(0, 4),
          states.date.slice(5, 7) - 1,
          states.date.slice(8, 12)
        )
      );
      setRecordModal(false);
    }
  };

  return (
    <div className="Register">
      <Header
        left={
          <Button
            text={"< 뒤로"}
            onClick={
              !isEdit
                ? () => setRegisterModal(false)
                : () => setEditModal(false)
            }
          />
        }
        center={isEdit ? "환자정보수정" : "환 자 등 록"}
      />
      <section>
        <span>전화 할 날짜</span>
        <div className="input_box">
          <input
            type="date"
            name="date"
            value={states.date}
            onChange={handleOnChange}
          />
        </div>
      </section>
      <section>
        <span>환자 이름</span>
        <div className="input_box">
          <input
            ref={nameInput}
            name="name"
            value={states.name}
            onChange={handleOnChange}
            placeholder={"개똥이"}
          />
        </div>
      </section>
      <section>
        <span>환자번호 or 보호자번호</span>
        <div className="input_box">
          <input
            ref={numberInput}
            name="number"
            value={states.number}
            onChange={handleOnChange}
            placeholder={"202200001"}
          />
        </div>
      </section>
      <section>
        <span>주증상 or 진단명</span>
        <div className="input_box">
          <input
            ref={ccInput}
            name="cc"
            value={states.cc}
            onChange={handleOnChange}
            placeholder={"식이알러지"}
          />
        </div>
      </section>
      <section>
        <span>메모</span>
        <div className="input_box">
          <textarea
            name="memo"
            value={states.memo}
            onChange={handleOnChange}
            placeholder={"소양감 개선 정도, 간식 먹였는지 심문해야함"}
          />
        </div>
      </section>
      <Footer
        left={
          <Button
            text={"취소"}
            type={"sub"}
            onClick={
              !isEdit
                ? () => setRegisterModal(false)
                : () => setEditModal(false)
            }
          />
        }
        right={<Button text={"완료"} type={"main"} onClick={handleOnSubmit} />}
      />
    </div>
  );
}
