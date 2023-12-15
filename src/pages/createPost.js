import { useCallback, useEffect} from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import CreatePostForm from "@/app/components/CreatePostForm";
import styles from "@/app/components/components.module.css";

export default function CreatePost({isLoggedIn, userInformation }){
    const router = useRouter();
    useEffect(() => {
        //if user is not logged in, sends to login
        if (!isLoggedIn) router.push("/");
    }, [isLoggedIn]);



    const createPostFunction = useCallback(
        async (e, imageUpload) => {
        e.preventDefault();
        const storage = getStorage();
        const db = getFirestore();
        const postContent = e.currentTarget.postContent.value;
        const friend = e.currentTarget.friend.value;
        let imageURL;
        const storageRef = ref(storage, imageUpload?.name);
        if(imageUpload){
          await uploadBytes(storageRef, imageUpload)
            .then(async (snapshot) => {
              await getDownloadURL(snapshot.ref).then((url) => {
                  imageURL = url;
                });
            })
            .catch((error) => {
              console.warn(error);
            });
          }

        const userId = userInformation.uid;
        const data = await addDoc(collection(db, "posts"), {
            postContent: postContent,
            userId: userId,
            imageURL: imageURL || '',
            friend: friend || '',
        });
        if(data) {
            router.push("/profile");
        }
    }, 
    [addDoc, collection, getFirestore, router, userInformation]
    );


    return (
        <>
        <main>
            <h2 className={styles.CardTitle}>create memories</h2>
            <CreatePostForm createPostFunction={createPostFunction} />
        </main>
        </>
    );
}