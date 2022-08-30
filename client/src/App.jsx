import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AnimalDetail } from "./pages/animal/AnimalDetail";
import { AnimalEdit } from "./pages/animal/AnimalEdit";
import { AnimalListTable } from "./pages/animal/AnimalListTable";
import { AnimalRegister } from "./pages/animal/AnimalRegister";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="animal" element={<AnimalListTable />} />
        <Route path="animal/register" element={<AnimalRegister />} />
        <Route path="animal/:id" element={<AnimalDetail />} />
        <Route path="animal/:id/edit" element={<AnimalEdit />} />
      </Routes>
    </>
  );
}

export default App;
