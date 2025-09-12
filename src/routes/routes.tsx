import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import App from '../App';
import About from '../about';
import Login from '../pages/auth/login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <App></App>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    }

]);

export default router;