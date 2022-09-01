import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export const SearchList = ({ filteredAnimalList, setOpen }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>환자이름</TableCell>
            <TableCell align="center">보호자</TableCell>
            <TableCell align="center">전화번호</TableCell>
            <TableCell align="center">해피콜수</TableCell>
            <TableCell align="center">자세히</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAnimalList.map((animal) => (
            <TableRow
              key={animal._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{animal.name}</TableCell>
              <TableCell align="center">{animal.owner}</TableCell>
              <TableCell align="center">{animal.phonenumber}</TableCell>
              <TableCell align="center">{animal.happycalls.length}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    navigate(`/animal/${animal._id}`);
                    setOpen(false);
                  }}
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
