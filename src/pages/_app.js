import {useEffect, useState, useCallback} from 'react';
import { initializeApp } from "firebase/app";
import {getAuth, 
        createUserWithEmailAndPassword, 
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut
        } from "firebase/auth";
import {addDoc, getFirestore, collection} from "firebase/firestore";
import Header from "@/app/components/Header";
import firebaseConfig from "@/app/components/firebaseConfig"

export default function MyApp({ Component, pageProps}){
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const [error, setError] = useState(null);


    const createUserFunction = useCallback(
        async(e) => {
            e.preventDefault();
            const name = e.currentTarget.name.value
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const db = getFirestore();
            const auth = getAuth();
            let user;
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage});
                    return setError(errorMessage);
                    });
            if (user){
            //Create User reference in firestore
                await addDoc(collection(db, "users"), {
                    name: name|| null,
                    email: email || null,
                    userId: user?.uid || null,
                })
                    .then(() => {
                        const userToSet = {...user, name}
                        setIsLoggedIn(true);
                        setUserInformation(userToSet);
                        setError(null);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.warn({error, errorCode, errorMessage});
                        setError(errorMessage);
                        });
            }
        },
            [setError, setIsLoggedIn, setUserInformation]);



    const loginUser = useCallback(
        (e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value
            const password = e.currentTarget.password.value
            const auth = getAuth()
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation(user);
                    setError(null);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage});
                    setError(errorMessage);
                })
    }, [setError, setIsLoggedIn, setUserInformation]);


    const logoutUser = useCallback(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation(null);
                setIsLoggedIn(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({ error, errorCode, errorMessage});
                setError(errorMessage);
            });
    }, [setError, signOut, setIsLoggedIn, setUserInformation]);


    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);


    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else{
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                setIsLoading(false);
            });
        }
    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
        <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
        <Component
            {...pageProps}
            createUserFunction={createUserFunction}
            isLoggedIn={isLoggedIn}
            loginUser={loginUser}
            userInformation={userInformation}
        />
        <p>{error}</p>
        </>
    )};
