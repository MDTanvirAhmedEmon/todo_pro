import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import PrivateRoute from './PrivateRoute';
import SingleTodo from '../pages/singleTodo/SingleTodo';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/app/todos',
                element: (
                    <PrivateRoute><Dashboard /></PrivateRoute>
                ),
            },
            {
                path: '/app/todos/:id',
                element: (
                    <PrivateRoute><SingleTodo /></PrivateRoute>
                ),
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },

]);

export default router;