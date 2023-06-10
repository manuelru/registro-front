import  { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/Main.css'
import '../../css/Form.css'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Insumos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    quantity: '',
    price:'',
    description:'',
    date: ''
  });
  const [insumos, setInsumos] = useState([]);


  
  const obtenerInsumos = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/supplies`);
      const data = await response.json();
      setInsumos(data);
    } catch (error) {
      console.log('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    obtenerInsumos();
  }, []);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL;

    if (formData.id) {
      // Realizar la solicitud de actualización a tu API
      fetch(`${baseUrl}/supplies/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: formData.quantity,
          price: formData.price,
          description: formData.description,
          date: formData.date,
        })
      })
        .then(response => {
          if (response.ok) {
            alert('Registro actualizado con éxito');
            toggleModal();
            setFormData({ id:'', quantity: '', price: '', description:'',date:'' });
            obtenerInsumos(); // Actualizar la lista de productos después de la actualización
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
      fetch(`${baseUrl}/supplies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: formData.quantity,
          price: formData.price,
          description: formData.description,
          date: formData.date,

        })
        
      })
        .then(response => {
          if (response.ok) {
            alert('Registro guardado con éxito');
            toggleModal();
            setFormData({ id:'', quantity: '', price: '',description:'',date:'' });
            obtenerInsumos(); // Actualizar la lista de productos después de la creación
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

  const eliminarInsumos = async (id:'') => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${baseUrl}/supplies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      obtenerInsumos();
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

  const handleEdit = (id:'',quantity: '', price: '',description:'',date:'') => {
    setFormData({
      id: id,
      quantity: quantity,
      price: price,
      description:description,
      date: date
    });
    toggleModal();
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      quantity: '',
      price: '',
      description:'',
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
              {formData.id ? 'Editar registro' : 'Registrar una nueva compra de insumos'}
            </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Unidades compradas:</label>
              <input
                type="number"
                name="quantity"
                placeholder='Unidades compradas)'
                value={formData.quantity}
                onChange={handleChange}
              />

              <label htmlFor="price">Precio Unitario:</label>
              <input
                type="number"
                name="price"
                placeholder='Precio (Unidades)'
                value={formData.price}
                onChange={handleChange}
              />
              <label htmlFor="description">Descripcion:</label>
              <input
                type="text"
                name="description"
                placeholder='Descripcion del producto'
                value={formData.description}
                onChange={handleChange}
              />

              <label htmlFor="date">Fecha de compra:</label>
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
            <h3 className='txt-register-nacim'>REGISTRO DE COMPRA DE INSUMOS</h3>
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
            <th  className='filas'>Descripcion</th>
            <th  className='filas'>Precio total</th>
            <th  className='filas'>Fecha de compra</th>
            <th className='filas'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {insumos.map((producto) => (
            <tr key={producto.id}>
              <td className='filas'>{producto.quantity}</td>
              <td className='filas'>{producto.price}</td>
              <td className='filas'>{producto.description}</td>
              <td className='filas'><p>C$ {producto.quantity*producto.price}</p></td>
              <td className='filas'>{producto.date}</td>

              <td className='filas'>
                {formData.id === producto.id ? (
                  <>
                  </>
                ) : (
                  <button   onClick={() => handleEdit(producto.id, producto.quantity, producto.price,producto.description, producto.date)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                <button className='button-delete' onClick={() => eliminarInsumos(producto.id)}> 
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

export default Insumos;
