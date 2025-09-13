import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice";
import type { IlogInUser } from "../global/todoType";
const MainLayout = () => {
    const user = useSelector((state: IlogInUser) => state.logInUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogOut = () => {
        dispatch(setUser({ user: null, token: null }))
        navigate(`/login`)
    }

    return (
        <div className=" ">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">Todo Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 hidden sm:inline">Welcome, {user?.user?.name}</span>
                            <button
                                onClick={handleLogOut}
                                className="bg-purple-600 text-white px-3 py-1 cursor-pointer rounded-md text-sm hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                aria-label="Sign out of your account"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;