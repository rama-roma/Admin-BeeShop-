import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./pages/loginPage";
import BrandPage from "./pages/brandPage";
import ColorPage from "./pages/colorPage";
import CategoryPage from "./pages/categoryPage";
import ProtectedRoute from "./services/projectedRoute";
import ProductPage from "./pages/productPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/productPage" element={<ProductPage />} />
          <Route path="/brandPage" element={<BrandPage />} />
          <Route path="/colorPage" element={<ColorPage />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
