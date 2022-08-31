import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchModal() {
  return (
    <Card sx={{ position: "absolute", width: 600, height: 500 }}>
      <CardActionArea>
        <CardContent>
          <TextField
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            helperText="환자이름, 보호자이름, 전화번호로 검색하세요"
          />
          <Typography gutterBottom variant="h5" component="div">
            환자
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            해피콜
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
