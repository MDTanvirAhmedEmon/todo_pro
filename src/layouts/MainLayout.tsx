import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <div className=" ">
            <h1>Test Header</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;