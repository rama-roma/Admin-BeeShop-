import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import LoginPage from './pages/loginPage'
import ProductPage from './pages/productPage'
import BrandPage from './pages/brandPage'
import ColorPage from './pages/colorPage'
import CategoryPage from './pages/categoryPage'
import SubCategoryPage from './pages/subCategoryPage'
import UserProfilePage from './pages/userProfilePage'

const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<LoginPage/>} />
          <Route path='/loginPage' element={<LoginPage/>} />
          <Route path='/productPage' element={<ProductPage/>} />
          <Route path='/brandPage' element={<BrandPage/>} />
          <Route path='/colorPage' element={<ColorPage/>} />
          <Route path='/categoryPage' element={<CategoryPage/>} />
          <Route path='/subCategoryPage' element={<SubCategoryPage/>} />
          <Route path='/userProfilePage' element={<UserProfilePage/>} />
        </Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App