import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Home from '../pages/home/Home';
import PrivateRoute from './PrivateRoute';
import SingleTodo from '../pages/singleTodo/SingleTodo';

const router = createBrowserRouter([
    {
        path: '/app/todos',
        element: <PrivateRoute><MainLayout /></PrivateRoute>,
        children: [
            {
                path: "/app/todos",
                element: <Home></Home>,
            },
            {
                path: "/app/todos/:id",
                element: <SingleTodo></SingleTodo>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }

]);

export default router;