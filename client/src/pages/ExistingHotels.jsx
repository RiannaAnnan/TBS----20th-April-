import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HotelImg from "../HotelImg";

export default function ExistingHotels () {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        axios.get('/admin-hotels').then(({data}) => {
            setHotels(data);
        }); 
    }, []);
    return(
        <div>
            {/* Heading - Hotels */}
            <h1 className="text-4xl text-center mt-4 mb-3">Hotels</h1>
            {/* goes through the hotels array using .map and if the
             array is greater than 0, display the hotels by title. */}
            <div className="mt-4">
            {hotels.length > 0 && hotels.map(hotel => (
    
                <Link to={'/account/hotels/'+hotel._id} className="flex bg-gray-200 p-3 rounded-2xl mb-3 gap-4 cursor-pointer">
                    <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 ">
                        {hotel.photos.length > 0 && (
                        <HotelImg hotel={hotel}/>
                        )}
                    </div>
                    <div>
                    <h2 className="text-xl font-bold">{hotel.title}</h2>
                    <p>{hotel.description}</p>
                    </div>
                </Link>
            ))}
            </div>
        </div>

    );
}