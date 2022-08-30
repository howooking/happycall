import {
  Autocomplete,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { dogbreeds } from "../../utils/dogbreeds";
import { catbreeds } from "../../utils/catbreeds";
import { useNavigate } from "react-router-dom";

export const AnimalRegister = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    image: "",
    name: "",
    owner: "",
    phonenumber: "",
    species: "",
    sex: "",
    breed: "",
    birth: "",
    memo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (window.confirm(`${register.name}을(를) 등록하시겠습니까?`)) {
      axios
        .post("http://localhost:5000/animal", register)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/animal");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        margin: "auto",
      }}
    >
      <Typography variant="h4" textAlign="center" mt={2}>
        환자 등록
      </Typography>
      <TextField
        name="image"
        id="image"
        label="환자 사진"
        variant="outlined"
        value={register.image}
        onChange={handleChange}
        helperText="이미지 URL링크를 입력해주세요."
        margin="dense"
      />
      <TextField
        name="name"
        id="name"
        label="환자 이름"
        variant="outlined"
        value={register.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        name="owner"
        id="owner"
        label="보호자 이름"
        variant="outlined"
        value={register.owner}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        name="phonenumber"
        id="phonenumber"
        label="전화번호"
        variant="outlined"
        value={register.phonenumber}
        onChange={handleChange}
        required
        helperText="숫자만 입력해주세요"
        margin="dense"
      />
      <TextField
        select
        name="species"
        id="species"
        label="종"
        variant="outlined"
        value={register.species}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="dog">개</MenuItem>
        <MenuItem value="cat">고양이</MenuItem>
      </TextField>
      <Autocomplete
        name="breed"
        id="breed"
        value={register.breed}
        options={
          register.species === ""
            ? []
            : register.species === "dog"
            ? dogbreeds
            : catbreeds
        }
        onChange={(event, value) =>
          setRegister({ ...register, breed: value?.label })
        }
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="품종"
            name="breed"
            id="breed"
            value={register.breed}
            onChange={handleChange}
          />
        )}
      />
      <TextField
        select
        name="sex"
        id="sex"
        label="성별"
        variant="outlined"
        value={register.sex}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="IM">Intact Male</MenuItem>
        <MenuItem value="CM">Castrated Male</MenuItem>
        <MenuItem value="IF">Intact Female</MenuItem>
        <MenuItem value="SF">Spayed Female</MenuItem>
        <MenuItem value="UK">Unknown</MenuItem>
      </TextField>

      <TextField
        type="date"
        name="birth"
        id="birth"
        label="생년월일"
        variant="outlined"
        value={register.birth}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        name="memo"
        id="memo"
        label="특이사항"
        multiline
        rows={4}
        value={register.memo}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" onClick={onSubmit}>
        환자등록
      </Button>
    </div>
  );
};
