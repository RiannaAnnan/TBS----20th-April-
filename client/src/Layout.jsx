import Header from "./Header";
import {Outlet} from "react-router-dom";

/* Outlet is a component provided by react which serves as a placeholder for routes */
export default function Layout(){
    return(
        /* flex column keeps everything in the same column*/ 
        <div className="flex flex-col min-h-screen py-4 px-8">
            <Header />
            <Outlet />
        </div>
    );
}