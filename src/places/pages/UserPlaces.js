import React from 'react'
import PlaceList from '../components/PlaceList';


const places = [
    {
        id: "p1",
        title: "Mount Kilimandjaro",
        description: "One of the highes summits in the world",
        imageUrl:
            "https://images.unsplash.com/photo-1631646109206-4b5616964f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2lsaW1hbmphcm98ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
        address: "Tanzania",
        location: {
            lat: -3.0674031,
            lng: 37.3468725,
        },
        creator: "u1",
    },

    {
        id: "p2",
        title: "Cristo Redentor",
        description: "Giant tall mountaintop statue of jesus",
        imageUrl:
            "https://images.unsplash.com/photo-1608378963517-1c47051c7415?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y3Jpc3RvJTIwcmVkZW50b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
        address:
            "2QXQ+6R Alto da Boa Vista, Rio de Janeiro - State of Rio de Janeiro, Brazil",
        location: {
            lat: -22.951911,
            lng: -43.2126759,
        },
        creator: "u2",
    },
];
const UserPlaces = () => {
    return (
        <PlaceList items={places} />
    )
}

export default UserPlaces
