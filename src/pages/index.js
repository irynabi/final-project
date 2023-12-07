import UserProfileCard from "@/app/components/UserProfileCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfile( {isLoggedIn, userInformation} ) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) router.push("/login");
    }, [isLoggedIn]);

    return (
        <main> 
            <h1> User Profile </h1>
            <UserProfileCard user={userInformation}/>
        </main>
    );
};

