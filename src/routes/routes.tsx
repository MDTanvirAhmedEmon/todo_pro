import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import App from '../App';
import About from '../about';

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
    }

]);

export default router;