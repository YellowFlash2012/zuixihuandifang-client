import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

import {useHttpClient} from "../../shared/hooks/http-hook"

import ErrorModal from "../../shared/components/UI/ErrorModal" 
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner" 


const UserPlaces = () => {

    const [loadedPlaces, setLoadedPlaces] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchedPlaces = async () => {
            try {
                const data = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );

                console.log(data);
                setLoadedPlaces(data.places);
                console.log(data.places);
            } catch (error) {
                
            }
        }
        fetchedPlaces();
    }, [sendRequest, userId])
    

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />

            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}

            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
        </>
    );
}

export default UserPlaces
