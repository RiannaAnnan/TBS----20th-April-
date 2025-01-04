import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import HotelGallery from "../HotelGallery";

export default function Hotel() {
    {/* params allows us to access the json key value of the returned url */}
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);


    useEffect(() => {
        if (!id) {
            return;
        }
    axios.get(`/hotels/${id}`).then(response => {
        setHotel(response.data);
    });
    }, [id]);

    if (!hotel) return '';

    
    return(
        <div className="bg-gray-100 mt-6 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{hotel.title}</h1>
            {/* Address Link */}
            {/* This creates a link to google maps which opens in a new tab */}
        <a className=" flex block font-semibold underline my-2" target="_blank" href={'https://maps.google.com/?q='+ hotel.address}>{hotel.address}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        </a>
            {/* Image gallery */}
            <HotelGallery hotel={hotel}/>
            {/* Description */}
            <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {hotel.description}
            </div>
            {/* Extra Info */}
            <div className="my-4">
            <h2 className="font-semibold text-2xl">Additional Information</h2>
            {hotel.extraInfo}
            {/* Check-In & Check-Out */}
            <div className="grid grid-cols-2">
                <div>
                Check-In: {hotel.checkIn}<br />
                Check-Out: {hotel.checkOut}<br />
                Maximum number of guests: {hotel.maxGuests}
                </div>
                {/* Booking Component */}
                <BookingWidget hotel={hotel} />
            </div>
        </div>
        </div>
    );
}