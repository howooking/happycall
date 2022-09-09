import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AnimalDetail } from "./pages/animal/AnimalDetail";
import { AnimalEdit } from "./pages/animal/AnimalEdit";
import { AnimalListTable } from "./pages/animal/AnimalListTable";
import { AnimalRegister } from "./pages/animal/AnimalRegister";
import { HappycallDetail } from "./pages/happycall/HappycallDetail";
import { HappycallListTable } from "./pages/happycall/HappycallListTable";
import { HappycallRegister } from "./pages/happycall/HappycallRegister";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="animal" element={<AnimalListTable />} />
        <Route path="animal/register" element={<AnimalRegister />} />
        <Route path="animal/:id" element={<AnimalDetail />} />
        <Route path="animal/:id/edit" element={<AnimalEdit />} />
        <Route
          path="animal/:id/happycall/register"
          element={<HappycallRegister />}
        />
        <Route path="happycall" element={<HappycallListTable />} />
        <Route path="/happycall/:id" element={<HappycallDetail />} />
      </Routes>
    </>
  );
}

export default App;
