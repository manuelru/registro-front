import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({
    name: "Darwin Salinas H",
    email: "salinash2000@gmail.com aut",
  });

  const [example, setExample] = useState({
    newName: "Juan",
    secondaryName: "Manuel.",
    contador: 0
    
  });

  const [cart, setCart] = useState({
    totalItems: 0,
    items: [],
  });

  const greeting = () => {
    alert("hola");
  };

  const getTotalCart = () => {
    return cart.items.reduce((acc, item) => acc + item.price * item.amount, 0);
  };

  return (
    <AuthContext.Provider
      value={{
        // state
        user,
        cart,
        example,

        // functions
        setUser,
        greeting,
        setCart,
        getTotalCart,
        setExample
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
