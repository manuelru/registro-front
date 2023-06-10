import {  Route, Routes } from "react-router-dom";
import Nacimientos from "../components/nacimientos/Nacimientos";
import Leche from "../components/leche/Leche";
import Insumos from "../components/insumos/Insumos"
import Trabajadores from "../components/trabajadores/Trabajadores";
import Ventas from "../components/ventas/Ventas";


export const ProductsPage = () => {
  return (
    <>

     <Routes>
      <Route path="/" element={<Leche />} />
        <Route path="nacimientos" element={<Nacimientos />} />
        <Route path="insumos" element={<Insumos />} />
        <Route path="trabajadores" element={<Trabajadores />} />
        <Route path="ventas" element={<Ventas />} />
      </Routes>
    </>
  );
};
