import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import AddBook from '/src/pages/AddBook.jsx'
import EditBook from '/src/pages/EditBook.jsx'
import HomePage from '/src/pages/HomePage.jsx'

function App() {

  const browserRouter = createBrowserRouter([{
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/add-book',
        element: <AddBook />
      },
      {
        path: '/edit-book/:id',
        element: <EditBook />
      }
    ]
  }])

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
