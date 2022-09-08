import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import useFetch from "../../hook/useFetch";

export const HappycallRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    cc: "",
    callDate: "",
    memo: "",
  });

  const { data: selectedAnimal } = useFetch(
    `http://localhost:5000/animal/${id}`
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (window.confirm(`${selectedAnimal.name}의 해피콜을 등록하시겠습니까?`)) {
      axios
        .post(`http://localhost:5000/animal/${id}/happycall`, register)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/happycall");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <TextField
        label="환자이름"
        value={selectedAnimal.name}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />
      <TextField
        name="cc"
        id="cc"
        label="주증상 or 진단명"
        variant="outlined"
        value={register.cc}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        type="date"
        name="callDate"
        id="callDate"
        label="전화 할 날짜"
        variant="outlined"
        value={register.callDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        name="memo"
        id="memo"
        label="물어 볼 사항"
        multiline
        rows={4}
        value={register.memo}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" onClick={onSubmit}>
        해피콜 추가
      </Button>
    </div>
  );
};
