import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../FireBase/FireBase';



export const authcontext = createContext()
const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const auth = getAuth(app)

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }


    const userProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currenUser => {
            console.log('curren user is ', currenUser)
            setUser(currenUser)
        })
        return () => {
            return unsubscribe()
        }
    }, [])


    const userInfo = { user, signInUser, userProfile, logOut, createUser }
    return (
        <authcontext.Provider value={userInfo}>
            {children}
        </authcontext.Provider>
    );
};

export default ContextProvider;