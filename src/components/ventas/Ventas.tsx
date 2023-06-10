import  { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/Main.css'
import '../../css/Form.css'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Ventas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    earring:'',
    weight: '',
    subtraction:'',
    price: '',
    date:'',

  });
  const [ventas, setVentas] = useState([]);


  
  const obtenerVentas= async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/sales`);
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.log('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL;

    if (formData.id) {
      // Realizar la solicitud de actualización a tu API
      fetch(`${baseUrl}/sales/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          earring: formData.earring,
          weight: formData.weight,
          subtraction: formData.date,
          price: formData.price,
          date: formData.date,
          
        })
      })
        .then(response => {
          if (response.ok) {
            alert('Registro actualizado con éxito');
            toggleModal();
            setFormData({ id:'', name: '',earring:'', weight: '',subtraction:'' ,price:'',date:''});
            obtenerVentas(); // Actualizar la lista de productos después de la actualización
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
      fetch(`${baseUrl}/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          earring: formData.earring,
          weight: formData.weight,
          subtraction: formData.subtraction,
          price: formData.price,
          date: formData.date,
          
        })
        
      })
        .then(response => {
          if (response.ok) {
            alert('Registro guardado con éxito');
            toggleModal();
            setFormData({ id:'',  name: '', earring:'', weight: '',subtraction:'' ,price:'',date:'' });
            obtenerVentas(); // Actualizar la lista de productos después de la creación
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

  const eliminarVentas = async (id:'') => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${baseUrl}/sales/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      obtenerVentas();
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

  const handleEdit = (id:'', name: '',earring:'', weight: '',subtraction:'0' ,price:'',date:'') => {
    setFormData({
      id: id,
      name: name,
      earring:earring,
      weight: weight,
      subtraction: subtraction,
      price: price,
      date: date
    });
    toggleModal();
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      name: '',
      earring:'',
      weight: '',
      subtraction:'',
      price: '',
      date:'',
  
    });
    toggleModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay ">
          <div className="modal animate__animated animate__slideInLeft">
            <h2 className="titleFormNacimiento">
              {formData.id ? 'Editar registro' : 'Registrar ventas'}
            </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre del animal:</label>
              <input
                type="text"
                name="name"
                placeholder='Nombre de la vaca vendida'
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="earring">Numero de arete:</label>
              <input
                type="text"
                name="earring"
                placeholder='Numero de arete'
                value={formData.earring}
                onChange={handleChange}
              />

              <label htmlFor="weight">Peso del animal:</label>
              <input
                type="number"
                name="weight"
                placeholder='peso del animal (kilos)'
                value={formData.weight}
                onChange={handleChange}
              />

              <label htmlFor="date">% de destare:</label>
              <input
                type="number"
                name="subtraction"
                placeholder='% de destare'
                value={formData.subtraction}
                onChange={handleChange}
                />

               <label htmlFor="price">Precio del animal:</label>
              <input
                type="number"
                name="price"
                placeholder='Precio por kilo'
                value={formData.price}
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
            <h3 className='txt-register-nacim'>REGISTRO DE VENTAS</h3>
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
            <th  className='filas'>N° de arete</th>
            <th  className='filas'>Peso</th>
            <th  className='filas'>% de destare</th>
            <th  className='filas'>Precio por kilo</th>
            <th className='filas'>Precio total</th>
            <th className='filas'>Fecha</th>
            <th className='filas'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {ventas.map((producto) => (
            <tr key={producto.id}>
              <td className='filas'>{producto.name}</td>
              <td className='filas'>{producto.earring}</td>
              <td className='filas'><p>{producto.weight} KG</p></td>
              <td className='filas'><p>{producto.subtraction} %</p></td>
              <td className='filas'><p>C$ {producto.price}</p></td>
              <td className='filas'><p>C$ {(producto.weight-producto.subtraction)*producto.price}</p></td>
              <td className='filas1'>{producto.date}</td>

              <td className='filas'>
                {formData.id === producto.id ? (
                  <>
                  </>
                ) : (
                  <button   onClick={() => handleEdit(producto.id,producto.name, producto.earring, producto.weight,producto.subtraction, producto.price,producto.date)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                <button className='button-delete' onClick={() => eliminarVentas(producto.id)}> 
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

export default Ventas;
