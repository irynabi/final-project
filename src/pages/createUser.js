import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "@/app/components/components.module.css";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser({ createUserFunction, isLoggedIn}){
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    return (
        <>
        <main>
            <h2 className={styles.CardTitle}>create user</h2>
            <CreateUserForm createUserFunction={createUserFunction}/>
        </main>
        </>
    );
}