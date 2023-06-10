import  { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/Main.css'
import '../../css/Form.css'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Trabajadores = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    hoursworks:'',
    pricehours:'',
    date: ''
  });
  const [trabajadores, setTrabajadores] = useState([]);


  
  const obtenerTrabajadores = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/workers`);
      const data = await response.json();
      setTrabajadores(data);
    } catch (error) {
      console.log('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    obtenerTrabajadores();
  }, []);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL;

    if (formData.id) {
      // Realizar la solicitud de actualización a tu API
      fetch(`${baseUrl}/workers/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          hoursworks: formData.hoursworks,
          pricehours: formData.pricehours,
          date: formData.date,
        })
      })
        .then(response => {
          if (response.ok) {
            alert('Registro actualizado con éxito');
            toggleModal();
            setFormData({ id:'', name: '', hoursworks: '', pricehours:'',date:'' });
            obtenerTrabajadores(); // Actualizar la lista de productos después de la actualización
          } else {
            throw new Error('Error al actualizar el registro');
          }
        })
        .catch(error => {
          console.log(error);
          alert('Error al actualizar el registro');
        });
    } else {
      // Realizar la solicitud de creación a tu API
      fetch(`${baseUrl}/workers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          hoursworks: formData.hoursworks,
          pricehours: formData.pricehours,
          date: formData.date,
        })
        
      })
        .then(response => {
          if (response.ok) {
            alert('Registro guardado con éxito');
            toggleModal();
            setFormData({ id:'', name: '',hoursworks: '',pricehours:'',date:'' });
            obtenerTrabajadores(); // Actualizar la lista de productos después de la creación
          } else {
            throw new Error('Error al guardar el registro');
          }
        })
        .catch(error => {
          console.log(error);
          alert('Error al guardar el registro');
          
        });
    }
  };

  const eliminarTrabajadores = async (id:'') => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${baseUrl}/workers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      obtenerTrabajadores();
    } catch (error) {
      console.log('Error al eliminar el producto:', error);
    }
  };



  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (id:'',name: '', hoursworks: '',pricehours:'',date:'') => {
    setFormData({
      id: id,
      name:name,
      hoursworks:hoursworks,
      pricehours:pricehours,
      date:date,
    });
    toggleModal();
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      name: '',
      hoursworks: '',
      pricehours:'',
      date: ''
    });
    toggleModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay ">
          <div className="modal animate__animated animate__slideInLeft">
            <h2 className="titleFormNacimiento">
              {formData.id ? 'Editar registro' : 'Registrar un nuevo dia de trabajo'}
            </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre del trabajador:</label>
              <input
                type="text"
                name="name"
                placeholder='escribir el nombre del trabajador'
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="hoursworks">Horas trabajadas:</label>
              <input
                type="number"
                name="hoursworks"
                placeholder='horas trabajadas (por dia)'
                value={formData.hoursworks}
                onChange={handleChange}
              />
              <label htmlFor="pricehours">Precio por hora:</label>
              <input
                type="numbers"
                name="pricehours"
                placeholder='precio de la hora de trabajo'
                value={formData.pricehours}
                onChange={handleChange}
              />

              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <button type="submit">
                {formData.id ? 'Actualizar' : 'Enviar'}
              </button>
              <br />
              <button type="button" onClick={handleCancel}>
                  Cancelar
                </button>

            </form>
          </div>
        </div>
      )}


      <div className='div-btn-agregar'>
        <section className='section-title'>
            <h3 className='txt-register-nacim'>REGISTRO DE TRABAJADORES</h3>
        </section>
        <section  className='section-title-btn'>
        <button className="open-modal-btn" onClick={toggleModal}>
        NUEVO REGISTRO
      </button>
        </section>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th  className='filas'>Nombre</th>
            <th  className='filas'>Horas Trabajadas</th>
            <th  className='filas'>Precio por Hora</th>
            <th  className='filas'>Precio total</th>
            <th  className='filas'>Fecha</th>
            <th className='filas'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {trabajadores.map((producto) => (
            <tr key={producto.id}>
              <td className='filas'>{producto.name}</td>
              <td className='filas'>{producto.hoursworks}</td>
              <td className='filas'>{producto.pricehours}</td>
              <td className='filas'><p>C$ {producto.hoursworks*producto.pricehours}</p></td>
              <td className='filas'>{producto.date}</td>

              <td className='filas'>
                {formData.id === producto.id ? (
                  <>
                  </>
                ) : (
                  <button   onClick={() => handleEdit(producto.id, producto.name, producto.hoursworks,producto.pricehours, producto.date)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                <button className='button-delete' onClick={() => eliminarTrabajadores(producto.id)}> 
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trabajadores;
