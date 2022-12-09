import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import BoolList from './Components/BoolList/BoolList';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
      children: [
        {
          path: "/",
          element: <BoolList></BoolList>
        },
        {
          path: "/home",
          element: <BoolList></BoolList>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register>
          </Register>
        },
      ]
    },




  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
