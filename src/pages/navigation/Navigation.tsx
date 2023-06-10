
import { Link } from 'react-router-dom'
import './Navigation.css';

export const Navigation = () => {
  return (
    <div>
        <header>
            <nav className="menu">
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link className="menu-link" to={`/`}>LECHE</Link>
                    </li>
                    <li className="menu-item">
                        <Link className="menu-link" to={`/nacimientos`}>NACIMIENTOS</Link>
                    </li>
                    <li className="menu-item">
                    <Link className="menu-link" to={`/insumos`}>INSUMOS</Link>
                    </li>
                    <li className="menu-item">
                    <Link className="menu-link" to={`/trabajadores`}>TRABAJADORES</Link>
                    </li>
                    <li className="menu-item">
                    <Link className="menu-link" to={`/ventas`}>VENTAS</Link>
                    </li>
                </ul>
            </nav>
      </header>

      
        
    </div>
  )
}
