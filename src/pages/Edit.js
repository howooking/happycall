import { useContext, useState, useEffect } from "react";
import { PatientStateContext } from "../App";
import Register from "./Register";

export default function Edit({
  target,
  setEditModal,
  setCurDate,
  setRecordModal,
}) {
  const [seletedIdData, setSeletedIdData] = useState();
  const patientList = useContext(PatientStateContext);

  useEffect(() => {
    if (patientList.length >= 1) {
      const targetPatient = patientList.find(
        (it) => parseInt(it.id) === parseInt(target)
      );
      setSeletedIdData(targetPatient);
    }
  }, [patientList, target]);
  if (!seletedIdData) {
    return <div>로딩중입니다...</div>;
  } else {
    return (
      <div className="Edit">
        {seletedIdData && (
          <Register
            isEdit={true}
            seletedIdData={seletedIdData}
            setEditModal={setEditModal}
            setCurDate={setCurDate}
            setRecordModal={setRecordModal}
          />
        )}
      </div>
    );
  }
}
