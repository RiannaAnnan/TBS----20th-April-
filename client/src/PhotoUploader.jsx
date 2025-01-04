import { useState } from "react";
import axios from "axios";

export default function PhotoUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState('');
    async function addPhotoByLink(ev) {
        // prevents the page from reloading once the upload button has been clicked
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        onChange(prev => {
            return[...prev, filename];
        });
        // after the upload button has been clicked, this resets the image input field
        setPhotoLink('');
    }
    return (
        <>
        <div className="flex gap-2">
                            <input type="text" value={photoLink}
                             onChange={ev => setPhotoLink(ev.target.value)}
                             placeholder={'Upload using an image address...'}/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Upload photo</button>
                        </div>
                        {/* Upload section */}
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {/* This line of code places the uploaded image beside the button. Map is used to go through each item in the array */}
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div key={link} className="h-40 flex"> 
                                <img className="rounded-xl" src={'http://localhost:4000/uploads/'+link}/>
                            </div>
                            ))}
                        </div>
        </>
    )
}