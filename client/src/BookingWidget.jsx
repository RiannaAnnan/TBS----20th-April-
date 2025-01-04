import axios from "axios";
import { useContext, useState, useEffect } from "react";
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import {UserContext} from "./UserContext";

export default function BookingWidget({hotel}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numGuests, setNumGuests] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    // when logged in, prefills the name in the name input field with the user's.
    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numOfNights = 0;
    if (checkIn && checkOut) {
        numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookHotel(){
        const response = await axios.post('/hotelbookings', {
            hotel:hotel._id, checkIn, checkOut, numGuests, name, phoneNumber, price:numOfNights * hotel.price,
        });
        const hotelbookingId = response.data._id;
        setRedirect(`/account/bookings/${hotelbookingId}`);
    };

    if (redirect) {
        return <Navigate to = {redirect} />
    }
    

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
        <div className="text-center text-2xl mb-2">
        Price per night: £{hotel.price}
        </div>
        <div className="border rounded-2xl">
            <div className="flex">
                <div className="py-4 px-4">
                    <label>Check in:</label>
                    <input type="date" 
                    value={checkIn} 
                    onChange={ev => setCheckIn(ev.target.value)}/>
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" 
                        value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)}/>
                        </div>
            </div>
        </div>
        <div className="py-3 px-3 border-t">
            <label>Number of guests:</label>
            <input type="number" 
            value={numGuests} 
            onChange={ev => setNumGuests(ev.target.value)}></input>
        </div>
        {numOfNights > 0 && (
            <div className="py-3 px-3 border-t">
            <label>Your full name:</label>
            <input type="text" value={name}
            onChange={ev => setName(ev.target.value)}/>
            <label>Phone Number:</label>
            <input type="tel" value={phoneNumber}
            onChange={ev => setPhoneNumber(ev.target.value)}/>
    
            </div>
        )}
        <button onClick={bookHotel}className="primary mt-3">Book this hotel<br></br>
        {numOfNights > 0 && (
            <span>£{numOfNights * hotel.price}</span>
        )}
        </button>
    </div>
    );
}