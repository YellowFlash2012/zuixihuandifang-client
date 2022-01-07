import React from 'react'

import { Link } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';
import PlaceItem from './PlaceItem';

import "./PlaceList.css"

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No place found! Do you want to create one?</h2>

                    <button>
                        <Link to="places/new"> Share place</Link>
                    </button>
                </Card>
            </div>
        );
    }

    return <ul className="place-list">
        {props.items.map(place => (
            <PlaceItem
                key={place.id}
                id={place.id}
                image={place.imageUrl}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creator}
                coordinates={place.coordinates}
            />
        ))}
    </ul>
    
}

export default PlaceList
