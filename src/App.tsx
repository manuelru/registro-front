import { AuthContextProvider } from "./context/AuthContext";
import { ProductsPage } from "./pages/ProductsPage";
import { Navigation } from "./pages/navigation/Navigation";

function App() {
  return (
    <AuthContextProvider>
      <Navigation/>
      <ProductsPage />
    </AuthContextProvider>
  );
}

export default App;
