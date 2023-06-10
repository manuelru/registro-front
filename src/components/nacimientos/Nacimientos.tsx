import  { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/Main.css'
import '../../css/Form.css'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Nacimientos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dateBirth: '',
    color:'',
    sexo:'',
    dateDestete:''
  });
  const [productos, setProductos] = useState([]);


  
  const obtenerProductos = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/births`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.log('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL;

    if (formData.id) {
      // Realizar la solicitud de actualización a tu API
      fetch(`${baseUrl}/births/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          dateBirth: formData.dateBirth,
          color: formData.color,
          sexo: formData.sexo,
          dateDestete: formData.dateDestete
        })
      })
        .then(response => {
          if (response.ok) {
            alert('Registro actualizado con éxito');
            toggleModal();
            setFormData({ id:'', name: '', dateBirth: '',color:'',sexo:'', dateDestete:'' });
            obtenerProductos(); // Actualizar la lista de productos después de la actualización
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
      fetch(`${baseUrl}/births`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          dateBirth: formData.dateBirth,
          color: formData.color,
          sexo: formData.sexo,
          dateDestete: formData.dateDestete

        })
        
      })
        .then(response => {
          if (response.ok) {
            alert('Registro guardado con éxito');
            toggleModal();
            setFormData({ id:'', name: '', dateBirth: '',color:'', sexo:'',dateDestete:'' });
            obtenerProductos(); // Actualizar la lista de productos después de la creación
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

  const eliminarProducto = async (id:'') => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${baseUrl}/births/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      obtenerProductos();
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

  const handleEdit = (id:'', name:'', dateBirth:'',color:'',sexo:'',dateDestete:'') => {
    setFormData({
      id: id,
      name: name,
      dateBirth: dateBirth,
      color: color,
      sexo:sexo,
      dateDestete: dateDestete
    });
    toggleModal();
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      name: '',
      dateBirth: '',
      color: '',
      sexo:'',
      dateDestete: ''


    });
    toggleModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay ">
          <div className="modal animate__animated animate__slideInLeft">
            <h2 className="titleFormNacimiento">
              {formData.id ? 'Editar registro' : 'Registrar un nuevo nacimiento'}
            </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                name="name"
                placeholder='Nombre de la madre del ternero'
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="dateBirth">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="dateBirth"
                value={formData.dateBirth}
                onChange={handleChange}
              />

              <label htmlFor="color">Color:</label>
              <input
                type="text"
                name="color"
                placeholder='Color del ternero'
                value={formData.color}
                onChange={handleChange}
              />

              <label htmlFor="sexo">Sexo:</label>
              <input
                type="text"
                name="sexo"
                placeholder='"F" o "M"'
                value={formData.sexo}
                onChange={handleChange}
              />

              <label htmlFor="dateDestete">Fecha Destete:</label>
              <input
                type="date"
                name="dateDestete"
                value={formData.dateDestete}
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
            <h3 className='txt-register-nacim'>REGISTRO DE NACIMIENTOS</h3>
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
            <th  className='filas'>Fecha Nacimiento</th>
            <th  className='filas'>Color</th>
            <th  className='filas'>Sexo</th>
            <th  className='filas'>Fecha Destete</th>
            <th className='filas'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className='filas'>{producto.name}</td>
              <td className='filas'>{producto.dateBirth}</td>
              <td className='filas'>{producto.color}</td>
              <td className='filas'>{producto.sexo}</td>
              <td className='filas'>{producto.dateDestete}</td>

              <td className='filas'>
                {formData.id === producto.id ? (
                  <>
                  </>
                ) : (
                  <button onClick={() => handleEdit(producto.id, producto.name, producto.dateBirth, producto.color,producto.sexo, producto.dateDestete)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                <button className='button-delete' onClick={() => eliminarProducto(producto.id)}> 
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

export default Nacimientos;
