import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HotelImg from "../HotelImg";

export default function IndexPage() {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        axios.get('/hotels').then(response => {
            {/* Enables the items to be displayed */}
            setHotels(response.data);
    });
    }, []);
    return(
        <div>
            {/* Heading */}
            <h1 className="text-4xl text-center mt-4 mb-8">Where will you go next?</h1>
            <h2 className="text-3xl flex font-bold">Hotels</h2>      
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.length > 0 && hotels.map(hotel => (
            <Link to={'/hotel/'+ hotel._id}>
                <div className="flex bg-gray-500 rounded-2xl">
                {/* Retrives the images from the hotel collection */}
                <HotelImg hotel={hotel} />
            </div>
            <h2 className="font-bold truncate">{hotel.title}</h2>
            <h3 className="text-sm">{hotel.address}</h3>
            {/* Price per night */}
            <div className="mt-2">
                £{hotel.price} per night
            </div>
            </Link>
            ))}
        </div>
        </div> 
    );
}