import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './components/Dashboard'
import RegistrarVenta from './components/RegistrarVenta'
import Historial from './components/Historial'
import Analisis from './components/Analisis'
import Ajustes from './components/Ajustes'

// App principal con diseño responsive
export default function App() {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors duration-300 md:pl-64">
      <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registrar" element={<RegistrarVenta />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  )
}
