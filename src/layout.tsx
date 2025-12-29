import { Button } from 'antd'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header className='max-w-[1400px] m-auto p-4'>
        <nav className='flex items-center justify-center gap-[10px]'>
          <Link to='/productPage'>
            <Button>Product</Button>
          </Link>
          <Link to='/brandPage'>
            <Button>Brand</Button>
          </Link>
          <Link to='/colorPage'>
            <Button>Color</Button>
          </Link>
          <Link to='/categoryPage'>
            <Button>Category</Button>
          </Link>
          <Link to='subCategoryPage'>
            <Button>SubCategory</Button>
          </Link>
          <Link to='/userProfilePage'>
            <Button>User Profile</Button>
          </Link>
        </nav>
      </header>

      <main className='max-w-[1400px] m-auto p-4'>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout