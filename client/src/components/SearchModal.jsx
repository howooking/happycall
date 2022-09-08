import * as React from "react";
import { InputAdornment, TextField, Modal, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import useFetch from "../hook/useFetch";
import { SearchList } from "./SearchList";

export default function SearchModal({ open, setOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const { data: animalList } = useFetch("http://localhost:5000/animal");

  const filteredAnimalList = animalList.filter((animal) => {
    if (searchTerm === "") {
      return null;
    } else if (
      animal.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
      animal.owner.toUpperCase().includes(searchTerm.toUpperCase()) ||
      animal.phonenumber.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return animal;
    }
  });

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    border: 0,
    borderRadius: "10px",
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          helperText="환자이름 or 보호자이름 or 전화번호로 검색하세요"
        />
        <Box>
          <SearchList
            filteredAnimalList={filteredAnimalList}
            setOpen={setOpen}
          />
        </Box>
      </Box>
    </Modal>
  );
}
