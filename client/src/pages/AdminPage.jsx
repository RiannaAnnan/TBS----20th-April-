import { Link, useParams } from "react-router-dom";
import HotelFormPage from "./HotelFormPage";
import { useEffect, useState } from "react";
import axios from "axios";
import ExistingHotels from "./ExistingHotels";

export default function AdminPage() {
    const [hotels, setHotels] = useState([]);
    const {action} = useParams();
    useEffect(() => {
        axios.get('/hotels').then(({data}) => {
            setHotels(data)
        });
    }, []);    
    
    return(
        <div>
            {action !== 'newhotel' && (
                 <div className="text-center">
                 {/* Link to add a new hotel */}
                 <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1" to = {'/account/admin/newhotel'}>Add new hotel
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                 </svg>
                 </Link>
             </div>
            )}
            {action === 'newhotel' && (
                <HotelFormPage />
            )}
            {action === 'edithotels' && (
                <ExistingHotels />
            )}
            <div className="text-center">
                {/* Link to add a new flight */}
                <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1 mt-3" to = {'/account/admin/newflight'}>Add new flight
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </Link>
            </div>
            <div className="text-center">
                {/* Link to add a new package */}
                <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1 mt-3" to = {'/account/admin/newpackage'}>Add new package
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </Link>
            </div>
            <></>
            <div className="text-center">
                {/* Link to view existing hotels */}
                <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1 mt-16" to = {'/edithotels'}>View existing hotels
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </Link>
                </div>
        </div>
    );
}