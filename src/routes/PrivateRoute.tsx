import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { IlogInUser } from '../global/todoType';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: IlogInUser) => state.logInUser)
    const { pathname } = useLocation();

    if (!user?.user && !user?.accessToken) {
        return <Navigate to="/login" state={{ path: pathname }}></Navigate>;
    }
    return children;
};


export default PrivateRoute;