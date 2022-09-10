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
import useFetch from "../../hook/useFetch";

export const HappycallListTable = () => {
  const navigate = useNavigate();
  const { data: happycallList } = useFetch("http://localhost:5000/happycall");

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>환자이름</TableCell>
            <TableCell align="center">주증상 or 진단명</TableCell>
            <TableCell align="center">전화번호</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {happycallList?.map((happycall) => (
            <TableRow
              key={happycall._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="happycall">
                {happycall.animal.breed === "cat" ? <FaCat /> : <FaDog />}
                {happycall.animal.name}
              </TableCell>
              <TableCell align="center">{happycall.cc}</TableCell>
              <TableCell align="center">
                {happycall.animal.phonenumber}
              </TableCell>

              <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/happycall/${happycall._id}`)}
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
