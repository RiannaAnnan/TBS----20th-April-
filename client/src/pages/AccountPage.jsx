import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import AdminPage from "./AdminPage";
import AccountNav from "./AccountNav";
import BookingsPage from "./BookingsPage";

export default function UserAccountPage() {
    // creates a new state for our redirection
    const [redirect, setRedirect] = useState(null);
    // retrieves the user context
    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    // the logout function clears the cookie, axios accesses the api and returns an object that we can use
    async function logout() {
        await axios.post('/logout'); 
        setRedirect('/login');
        setUser(null);
    }

    // if the user information has not yet been fetched, "loading" is displayed
    if (!ready) {
        return 'Loading...';
    }

    // if the user information has been fetched and the user has not logged in, return them to the login page
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    // if the user information has been fetched, display the account information
    return (
        <div>
            {/* navigation bar for the user account page*/}
            <AccountNav />

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-3">Logout</button>
                </div>
            )}
            {subpage === 'admin' && (
                <AdminPage />
            )}
            {subpage === 'bookings' && (
                <BookingsPage />
            )}
        </div>
    );
}