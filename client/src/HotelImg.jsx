export default function HotelImg({hotel, index=0, className=null}) {
    if (!hotel.photos?.length) {
        return '';
    }
    if (!className){
        className = "rounded-2xl"
    }
    return(
    <img className={className} src={'http://localhost:4000/uploads/'+ hotel.photos?.[index]} alt=""/>
    );

}