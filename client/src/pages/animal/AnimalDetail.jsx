import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { FaCat, FaDog } from "react-icons/fa";
import defaultImage from "../../assets/default.jpg";
import ageCalculator from "../../utils/ageCalculateor";
import useFetch from "../../hook/useFetch";

export const AnimalDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: selectedAnimal } = useFetch(
    `http://localhost:5000/animal/${id}`
  );

  const onDelete = () => {
    if (window.confirm(`${selectedAnimal.name}을(를) 삭제하시겠습니까?`)) {
      axios
        .delete(`http://localhost:5000/animal/${id}`)
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
    <Card sx={{ width: 600, height: 600, margin: "auto" }}>
      <CardMedia
        component="img"
        alt="img"
        height="300"
        image={selectedAnimal.image || defaultImage}
        sx={{ width: "500px", margin: "auto" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedAnimal.species === "cat" ? <FaCat /> : <FaDog />}
          {selectedAnimal.name}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          보호자 : {selectedAnimal.owner}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          전화번호 : {selectedAnimal.phonenumber}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          품종 : {selectedAnimal.breed}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          성별 : {selectedAnimal.sex}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          생년월일 : {selectedAnimal.birth}(
          {ageCalculator(selectedAnimal.birth)}살)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedAnimal.memo}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <Button
            color="success"
            onClick={() =>
              navigate(`/animal/${selectedAnimal._id}/happycall/register`)
            }
          >
            해피
          </Button>
          <Button
            color="primary"
            onClick={() => navigate(`/animal/${selectedAnimal._id}/edit`)}
          >
            수정
          </Button>
          <Button color="error" onClick={onDelete}>
            삭제
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
