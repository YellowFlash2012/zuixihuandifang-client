import React, {useEffect, useState} from 'react'
import UsersList from '../components/UsersList'

import ErrorModal from "../../shared/components/UI/ErrorModal"
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner"

const Users = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState();

    const [loadedUsers, setLoadedUsers] = useState();

    // bad idea to put async directly in useEffect callback, hence the necessity for sendRequest()
    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);

            try {
                const res = await fetch("http://localhost:5000/api/users");

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }

                setLoadedUsers(data.users);
                

            } catch (err) {
                
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, [])

    const errorHandler = () => {
        setError(null);
    }
    
    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />

            {isLoading && (
                <div className='center'>
                <LoadingSpinner />
            </div>
            )}

            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </>
    );
}

export default Users
