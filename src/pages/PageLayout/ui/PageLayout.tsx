import {Outlet} from "react-router-dom";

export const PageLayout = () => {
    return (
        <div>
            sidebar
            <main>
                <Outlet />
            </main>
        </div>
    );
};