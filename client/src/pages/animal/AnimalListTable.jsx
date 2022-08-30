import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { FaCat, FaDog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ageCalculator from "../../utils/ageCalculateor";
import useFetch from "../../hook/useFetch";

export const AnimalListTable = () => {
  const navigate = useNavigate();

  const { data: animalList } = useFetch("http://localhost:5000/animal");

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>환자이름</TableCell>
            <TableCell align="right">품종</TableCell>
            <TableCell align="right">성별</TableCell>
            <TableCell align="right">보호자</TableCell>
            <TableCell align="right">생년월일(나이)</TableCell>
            <TableCell align="right">전화번호</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {animalList.map((animal) => (
            <TableRow
              key={animal._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="animal">
                {animal.species === "cat" ? <FaCat /> : <FaDog />} {animal.name}
              </TableCell>
              <TableCell align="right">{animal.breed}</TableCell>
              <TableCell align="right">{animal.sex}</TableCell>
              <TableCell align="right">{animal.owner}</TableCell>
              <TableCell align="right">
                {animal.birth}({ageCalculator(animal.birth)}살)
              </TableCell>
              <TableCell align="right">{animal.phonenumber}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/animal/${animal._id}`)}
                >
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
