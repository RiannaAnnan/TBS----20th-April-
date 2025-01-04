import {Link, useParams} from "react-router-dom";

export default function AccountNav() {
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }
    // creates styling for each active link
    function linkClasses (type=null) {

    let classes = "py-2 px-4 ";
    if (type === subpage) {
    classes += "bg-primary rounded-full";
    }
    return classes;
    }
    return(
        // navigation bar for the user account page
        <nav className="w-full flex mt-4 gap-4 justify-center mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>
            Profile
            </Link>
        <Link className={linkClasses('bookings')}to={'/account/bookings'}>
            My Bookings
            </Link>
        <Link className={linkClasses('admin')}to={'/account/admin'}>
            Admin
            </Link>
    </nav>
    )
}