import { useContext, useEffect, useState } from "react";
import { OnActionContext, PatientStateContext } from "../App";
import Button from "../compontents/Button";
import Footer from "../compontents/Footer";
import Header from "../compontents/Header";
import ImproveList from "../compontents/ImproveList";
import { improveList } from "../util/improveList";

export default function Record({
  target,
  setTarget,
  setRecordModal,
  editModal,
  setEditModal,
}) {
  const [seletedIdData, setSeletedIdData] = useState();
  const patientList = useContext(PatientStateContext);
  const { onRecord, onDelete } = useContext(OnActionContext);

  //States
  const [states, setStates] = useState({
    improve: "",
    memo: "",
  });

  useEffect(() => {
    if (patientList.length >= 1) {
      const targetPatient = patientList.find(
        (it) => parseInt(it.id) === parseInt(target)
      );
      if (targetPatient) {
        setSeletedIdData(targetPatient);
        setStates({
          improve: targetPatient.improve,
          memo: targetPatient.memo,
        });
      }
    }
  }, [patientList, target]);

  const handleOnChange = (e) => {
    setStates({
      ...states,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickedImg = (cliecked) => {
    setStates({ ...states, improve: cliecked });
  };

  const handleOnRecord = () => {
    onRecord(target, states.improve, states.memo);
    setRecordModal(false);
  };

  const handleOnDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(target);
      setRecordModal(false);
    }
  };

  if (!seletedIdData) {
    return <div>로딩중입니다...</div>;
  } else {
    return (
      <div
        className="Record"
        style={editModal ? { display: "none" } : { display: "block" }}
      >
        <Header
          left={
            <Button text={"< 뒤로"} onClick={() => setRecordModal(false)} />
          }
          center={
            <>
              <div>{`${seletedIdData.name}(${seletedIdData.number})`}</div>
              <div>{seletedIdData.cc}</div>
            </>
          }
          right={<Button text={"삭제"} type={"sub"} onClick={handleOnDelete} />}
        />
        <section>
          <span>호전</span>
          <div className="improve_list_wrapper">
            {improveList.map((it) => (
              <ImproveList
                key={it.improve_id}
                {...it}
                onClick={handleClickedImg}
                isSelected={it.improve_id === states.improve}
              />
            ))}
          </div>
        </section>
        <section>
          <span>메모</span>
          <div className="input_box">
            <textarea
              name="memo"
              value={states.memo}
              onChange={handleOnChange}
            />
          </div>
        </section>

        <Footer
          left={
            <Button
              text={"정보수정"}
              onClick={() => {
                setEditModal(true);
                setTarget(target);
              }}
            />
          }
          right={
            <Button text={"기록"} type={"main"} onClick={handleOnRecord} />
          }
        />
      </div>
    );
  }
}
