import React from 'react'
import { createContext, useContext, useState } from 'react'


const AuthContext = createContext(null)

export default function AuthProvider({ children, isSignedIn }) {
    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    )
}
