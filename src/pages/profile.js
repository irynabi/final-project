import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    query,
    where,
    collection,
    getFirestore, 
    getDocs,
} from "firebase/firestore";
import styles from "@/app/components/components.module.css";
import UserProfileCard from "@/app/components/UserProfileCard";


export default function UserProfile({isLoggedIn, userInformation }) {
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!isLoggedIn) router.push("/login");
    }, [isLoggedIn]);

    //Gets user to display
    useEffect(() => {
        async function GetUser() {
            let user = {};
            const db = getFirestore();
            const q = query(collection(db, "users"), where("userId", "==", userInformation?.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
            setUser(user);
        }
        GetUser();
    });

    return (
        <>
        <main>
            <h2 className={styles.CardTitle}> your profile </h2>
            <UserProfileCard user ={user} userInformation={userInformation} />
        </main>
        </>
    );
 } 