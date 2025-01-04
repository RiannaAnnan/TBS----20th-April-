import PhotoUploader from "../PhotoUploader";
import Features from "../Features";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";


export default function HotelFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);

    // if the admin wishes to edit an existing listing.
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/hotels/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setLocation(data.location);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);


    {/* Creates or updates hotel and sends the data to the URL ending in '/hotels' */}
    async function addNewHotel(ev) {
        ev.preventDefault();
        if (id) {
            // update
            await axios.put('/hotels', {
                id, title, location, address, addedPhotos, description,
                features, extraInfo, checkIn, checkOut, maxGuests, price
            });
            alert('Hotel details have been updated!');
            setRedirect(true);
        } else {
            // creates new place
        await axios.post('/hotels', {title, location, address,
            addedPhotos,description, features, extraInfo, checkIn,
            checkOut, maxGuests, price
            });
            setRedirect(true);
        }
        }

        if (redirect) {
            return <Navigate to={'/account/admin'} />
        }
    return (
        <div>
        <form id="newhotel" onSubmit={addNewHotel}>
            <h2 align="left" className="text-xl">Title</h2>
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title - e.g. Name of hotel"/>
            <h2 align="left" className="text-xl">Location</h2>
            <input type="text" value={location} onChange={ev => setLocation(ev.target.value)}  placeholder="Location - e.g. Toronto, Canada"/>
            <h2 align="left" className="text-xl">Address</h2>
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address"/>
            <h2 align="left" className="text-xl">Photos</h2>
            {/* Calls on the photo uploader function to display the interface and handle the request */}
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            <h2 align="left" className="text-xl">Description</h2>
            <p align="left" className="text-gray-500 text-sm">Description of the hotel</p>
            <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
            <h2 align="left" className="text-xl">Features</h2>
            <p align="left"className="text-gray-500 text-sm">Choose from a list of extra benefits</p>
            <div>
                <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Features selected={features} onChange={setFeatures} />
                </div>
            </div>
            <h2 align="left" className="text-xl">Additional Information</h2>
            <p align="left" className="text-gray-500 text-sm">Extra information such as history and nearby landmarks</p>
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
            <h2 align="left" className="text-xl">Check In & Check Out times, max guests</h2>
            <p align="left" className="text-gray-500 text-sm">Add check in & out times as well as the maximum number of guests</p>
            <div className="grid gap-2 sm:grid-cols-3">
                <div>
                    {/* Input for check in time */}
                    <h3 align="left" className="mt-2 -mb-2 ">Check-In Time</h3>
                    <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="11"/>
                </div>
                <div>
                    {/* Input for check out time */}
                    <h3 align="left" className="mt-2 -mb-2 ">Check-Out Time</h3>
                    <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="16"/>
                </div>
                <div>
                    {/* Input for maximum number of guests */}
                    <h3 align="left" className="mt-2 -mb-2" >Maximum number of guests</h3>
                    <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                </div>
            </div>
            <div>
                {/* Input for the price */}
            <h2 align="left" className="text-xl">Price per night</h2>
            <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="Enter the price per night"/>  
            </div>
                <button className="primary my-4">Save</button>
        </form>
    </div>

    )
}