import { useState } from "react";

export default function HotelGallery({hotel}) {
    
    const [displayPhotos, setDisplayPhotos] = useState(false);
    
        if (displayPhotos) {
            return(
                <div className="absolute bg-black text-white inset-0 min-h-screen">
                    <div className="bg-black p-8 grid gap-4">
                        <div>
                            <h2 className="text-2xl mr-36">Photos of {hotel.title}</h2>
                            <button onClick={() => setDisplayPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            Close photos
                            </button>
                        </div>
                    {hotel?.photos?.length > 0 && hotel.photos.map(photo => (
                        <div>
                     <img src={"http://localhost:4000/uploads/" + photo} alt=""></img>   
                    </div>
                ))}
                </div>
                </div>
            );
        }
        return (    
        <div className="relative">
        {/* Picture grid 
        [2fr_1fr] creates a custom grid using tailwind */}
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div>
              {hotel.photos?.[0] && (
                <div>
                <img onClick={() => setDisplayPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/' + hotel.photos?.[0]} />
                </div>
              )}  
            </div>
            <div className="grid">
                {hotel.photos?.[1] && (
                <img onClick={() => setDisplayPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/' + hotel.photos?.[1]} />
            )}
            <div>
            {hotel.photos?.[2] && (
                <img onClick={() => setDisplayPhotos(true)} className="aspect-square object-cover cursor-pointer relative top-2" src={'http://localhost:4000/uploads/' + hotel.photos?.[2]} />
            )}  
            </div>
            </div>
        </div>
        <button onClick={() => setDisplayPhotos(true)} className="bg-white rounded-xl shadow shadow-md shadow-gray-500 absolute bottom-2 right-2 py-2 px-2">
            Display more images</button>
        </div>
    );
}