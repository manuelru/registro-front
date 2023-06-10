

export const getNacimientos = async () => {

    const baseUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${baseUrl}/products`);
    const products = await response.json();

    return products;
}


export const getNacimiento = async (id: string) => {

    const baseUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${baseUrl}/products/${id}`);
    const product = await response.json();

    return product;
}


export const posNacimiento = async (data: any) => {
    const baseUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const product = await response.json();

    return product;
}


const deleteNacimiento = async (id:string) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${baseUrl}/births/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getNacimientos();
    } catch (error) {
      console.log('Error al eliminar el producto:', error);
    }
  };