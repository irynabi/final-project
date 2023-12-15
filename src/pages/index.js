import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {getDocs, getFirestore, collection} from "firebase/firestore";
import PostCard from "../app/components/PostCard";
import styles from "@/app/components/components.module.css";

export default function Home({ isLoggedIn }) {
    const router = useRouter();
    const [allPosts, setAllPosts] = useState([]);

    useEffect (() => {
        if (!isLoggedIn) router.push("/login");
    }, [isLoggedIn]);

    useEffect(() => {
        async function getAllPosts(){
            const postsArray = [];
            const db = getFirestore();
            const postsQuery = await getDocs(collection(db, "posts"));

            postsQuery.forEach((post) => {
                postsArray.push({id: post.id, ...post.data() });
            });
            
            setAllPosts(postsArray);
        }
        getAllPosts();
    }, []);


    return (
        <main>
            <h2 className={styles.CardTitle}>home</h2>
            {allPosts.map((post, i) => (
                <PostCard post={post} key={i}/>
            ))}
        </main>
    );
}
