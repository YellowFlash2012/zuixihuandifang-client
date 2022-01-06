import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {

    const users = () => [
        {
            id: "u1",
            name: "Houki",
            image: "https://images.unsplash.com/photo-1591581741980-f68fbd92bcfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            place: 3,
        },
    ];
    
    return <UsersList items={users} />
}

export default Users
