import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login.tsx';
import Profile from './pages/profile.tsx';
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
import { Provider } from 'react-redux'
import { store } from './redux/store/store.tsx';
import PublicRoutes from './routes/PublicRouters.tsx';

const router = createBrowserRouter([
  {
    element: <PublicRoutes/>,
    children : [
      {
        path: "/",
        element: <Login/>,
      },
    ]
  },
  {
    element: <ProtectedRoutes/>,
    children: [
      {
        path: "/profile",
        element: <Profile/>,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
