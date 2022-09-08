import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { dogbreeds } from "../../utils/dogbreeds";
import { catbreeds } from "../../utils/catbreeds";
import useFetch from "../../hook/useFetch";

export const AnimalEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: editState, setData: setEditState } = useFetch(
    `http://localhost:5000/animal/${id}`
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditState({ ...editState, [name]: value });
  };

  const onEdit = () => {
    if (window.confirm(`${editState.name}을(를) 수정하시겠습니까?`)) {
      axios
        .put(`http://localhost:5000/animal/${id}`, editState)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(`/animal/${editState._id}`);
    }
  };

  if (!editState.breed) {
    //이렇게 안하면 breed가 렌더링되지 않는 에러 발생
    return <CircularProgress />;
  }
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
        환자 정보 수정
      </Typography>
      <TextField
        name="image"
        id="image"
        label="환자 사진"
        variant="outlined"
        value={editState.image}
        helperText="이미지 URL링크를 입력해주세요."
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="dense"
      />
      <TextField
        name="name"
        id="name"
        label="환자 이름"
        variant="outlined"
        value={editState.name}
        required
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        name="owner"
        id="owner"
        label="보호자 이름"
        variant="outlined"
        value={editState.owner}
        required
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        name="phonenumber"
        id="phonenumber"
        label="전화번호"
        variant="outlined"
        value={`${editState.phonenumber}`}
        required
        helperText="숫자만 입력해주세요"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="dense"
      />
      <TextField
        select
        name="species"
        id="species"
        label="종"
        variant="outlined"
        value={editState.species}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      >
        <MenuItem value="dog">개</MenuItem>
        <MenuItem value="cat">고양이</MenuItem>
      </TextField>
      <Autocomplete
        name="breed"
        id="breed"
        value={editState.breed}
        options={
          editState.species === ""
            ? []
            : editState.species === "dog"
            ? dogbreeds
            : catbreeds
        }
        onChange={(event, value) =>
          setEditState({ ...editState, breed: value?.label })
        }
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="품종"
            name="breed"
            id="breed"
            value={editState.breed}
          />
        )}
      />
      <TextField
        select
        name="sex"
        id="sex"
        label="성별"
        variant="outlined"
        value={editState?.sex}
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
        value={editState.birth}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        name="memo"
        id="memo"
        label="특이사항"
        multiline
        rows={4}
        value={editState.memo}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <Button variant="contained" onClick={onEdit}>
        수정
      </Button>
    </div>
  );
};
