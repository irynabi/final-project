import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/LoginForm";
import styles from "@/app/components/components.module.css";

export default function Login({ isLoggedIn, loginUser }) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) router.push("/");
    }, [isLoggedIn]);


    return (
        <>
        <main>
            <h2 className={styles.PopUps}> collect and store past memories with your friends (and your friends only) </h2>
            <h2 className={styles.CardTitle}>login</h2>
            <LoginForm loginUser={loginUser}/>
        </main>
        </>
    );
}