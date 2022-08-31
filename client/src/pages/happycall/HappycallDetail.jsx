import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonGroup,
  TextField,
  MenuItem,
} from "@mui/material";
import { FaCat, FaDog } from "react-icons/fa";
import defaltImage from "../../assets/default.jpg";
import axios from "axios";
import useFetch from "../../hook/useFetch";

export const HappycallDetail = () => {
  const navigate = useNavigate();
  const { id, happycallId } = useParams();

  const { data: selectedHappycall, setData: setSelectedHappycall } = useFetch(
    `http://localhost:5000/happycall/${happycallId}`
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedHappycall({
      ...selectedHappycall,
      [name]: value,
    });
  };

  const onEdit = () => {
    if (
      window.confirm(`${selectedHappycall.animal.name}을(를) 기록하시겠습니까?`)
    ) {
      //  setSelectedHappycall({ ...selectedHappycall, isDone: true });
      axios
        .put(
          `http://localhost:5000/happycall/${happycallId}`,
          selectedHappycall
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(`/happycall`);
    }
  };

  const onDelete = () => {
    if (
      window.confirm(`${selectedHappycall.animal.name}을(를) 삭제하시겠습니까?`)
    ) {
      axios
        .delete(`http://localhost:5000/animal/${id}/happycall/${happycallId}`)
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
    <Card sx={{ width: 600, height: "100%", margin: "auto" }}>
      <CardMedia
        component="img"
        alt="img"
        height="300"
        image={selectedHappycall.animal?.image || defaltImage}
        sx={{ width: "500px", margin: "auto" }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          {selectedHappycall.animal?.species === "cat" ? <FaCat /> : <FaDog />}
          {selectedHappycall.animal?.name}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          전화번호 : {selectedHappycall.animal?.phonenumber}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          주증상 or 진단명 : {selectedHappycall.cc}
        </Typography>

        <TextField
          name="memo"
          id="memo"
          label="메모"
          multiline
          rows={4}
          value={selectedHappycall.memo}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          select
          name="improve"
          id="improve"
          label="호전"
          variant="outlined"
          value={selectedHappycall.improve || ""}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value={1}>매우좋아짐</MenuItem>
          <MenuItem value={2}>좋아짐</MenuItem>
          <MenuItem value={3}>호전없음</MenuItem>
          <MenuItem value={4}>나빠짐</MenuItem>
          <MenuItem value={5}>매우나빠짐</MenuItem>
        </TextField>
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <Button color="success" onClick={() => navigate(`/animal/${id}`)}>
            환자정보
          </Button>
          <Button onClick={onEdit}>기록</Button>
          <Button color="error" onClick={onDelete}>
            삭제
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
