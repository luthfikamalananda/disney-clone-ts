import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login.tsx';
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
import { Provider } from 'react-redux'
import { store } from './redux/store/store.tsx';
import PublicRoutes from './routes/PublicRouters.tsx';
import Homepage from './pages/homepage.tsx';
import DetailMovie from './pages/detailMovie.tsx';
import Search from './pages/search.tsx';
import TestingPage from './pages/testingPage.tsx';

const router = createBrowserRouter([
  {
    element: <PublicRoutes/>,
    children : [
      {
        path: "/",
        element: <Login/>,
      },
    ],
    errorElement: <h1>404 Not Found</h1>
  },
  {
    element: <ProtectedRoutes/>,
    children: [
      {
        path: "/homepage",
        element: <Homepage/>,
      },
      {
        path: "/homepage/:movieId",
        element: <DetailMovie/>,
      },
      {
        path: "/search",
        element: <Search/>,
      },
      {
        path: "/testing",
        element: <TestingPage/>
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
