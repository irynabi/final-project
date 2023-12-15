import { useCallback, useEffect, useState} from "react";
import { useRouter } from "next/router";
import { query, limit, getFirestore, collection, getDocs } from "firebase/firestore"; 
import FindUserCard from "@/app/components/FindUserCard";
import styles from "@/app/components/components.module.css";


export default function FindUsers({isLoggedIn}){
    const router = useRouter();
    const [users, setAllUsers] = useState([]);

    useEffect(() => {
        //if user is not logged in, sends to login
        if (!isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    //Gets user to display
    useEffect(() => {
        async function getAllUsers(){
            const usersArray = [];
            const db = getFirestore();
            const usersQuery = await getDocs(collection(db, "users"), limit(4));

            usersQuery.forEach((user) => {
                usersArray.push({id: user.id, ...user.data() });
            });
            
            setAllUsers(usersArray);
        }
        getAllUsers();
    }, []);


    return (
        <main>
            <h2 className={styles.CardTitle}>find friends</h2>
            {users.map((user, i) => (
                <FindUserCard user={user} key={i}/>
            ))}
        </main>
    )
    };