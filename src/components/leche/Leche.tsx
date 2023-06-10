import  { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/Main.css'
import '../../css/Form.css'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Leche = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    quantity: '',
    price:'',
    date: ''
  });
  const [leche, setLeche] = useState([]);


  
  const obtenerLeche = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/milks`);
      const data = await response.json();
      setLeche(data);
    } catch (error) {
      console.log('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    obtenerLeche();
  }, []);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL;

    if (formData.id) {
      // Realizar la solicitud de actualización a tu API
      fetch(`${baseUrl}/milks/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: formData.quantity,
          price: formData.price,
          date: formData.date,
        })
      })
        .then(response => {
          if (response.ok) {
            alert('Registro actualizado con éxito');
            toggleModal();
            setFormData({ id:'', quantity: '', price: '',date:'' });
            obtenerLeche(); // Actualizar la lista de productos después de la actualización
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
      fetch(`${baseUrl}/milks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: formData.quantity,
          price: formData.price,
          date: formData.date,

        })
        
      })
        .then(response => {
          if (response.ok) {
            alert('Registro guardado con éxito');
            toggleModal();
            setFormData({ id:'', quantity: '', price: '',date:'' });
            obtenerLeche(); // Actualizar la lista de productos después de la creación
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

  const eliminarLeche = async (id:'') => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${baseUrl}/milks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      obtenerLeche();
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

  const handleEdit = (id:'',quantity: '', price: '',date:'') => {
    setFormData({
      id: id,
      quantity: quantity,
      price: price,
      date: date
    });
    toggleModal();
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      quantity: '',
      price: '',
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
              {formData.id ? 'Editar registro' : 'Registrar una nueva venta de leche'}
            </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="quantity">Cantidad Litros:</label>
              <input
                type="text"
                name="quantity"
                placeholder='Cantidad vendida en un dia (litros)'
                value={formData.quantity}
                onChange={handleChange}
              />

              <label htmlFor="price">Precio Litro:</label>
              <input
                type="text"
                name="price"
                placeholder='Precio (litro)'
                value={formData.price}
                onChange={handleChange}
              />

              <label htmlFor="date">Fecha de venta:</label>
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
            <h3 className='txt-register-nacim'>REGISTRO DE LECHE</h3>
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
            <th  className='filas'>Cantidad</th>
            <th  className='filas'>Precio</th>
            <th  className='filas'>Precio total de venta</th>
            <th  className='filas'>Fecha de venta</th>
            <th className='filas'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {leche.map((producto) => (
            <tr key={producto.id}>
              <td className='filas'>{producto.quantity}</td>
              <td className='filas'>{producto.price}</td>
              <td className='filas'>{producto.quantity*producto.price}</td>
              <td className='filas'>{producto.date}</td>

              <td className='filas'>
                {formData.id === producto.id ? (
                  <>
                  </>
                ) : (
                  <button  style={{marginLeft:"30%"}} onClick={() => handleEdit(producto.id, producto.quantity, producto.price, producto.date)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                <button className='button-delete' onClick={() => eliminarLeche(producto.id)}> 
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

export default Leche;
