import styles from "./components.module.css"
import {useState} from "react";

const CreatePostForm= ( {createPostFunction}) => {
    const [imageUpload, setImageUpload] = useState();
    return (
        <div>
            <form className={styles.Form} onSubmit={(e) => createPostFunction(e,imageUpload)}> 

                <label className={styles.Label} htmlFor="image">upload photo</label>
                <input className={styles.input}
                    type="file"
                    id="image"
                    name="image"
                    placeholder="Upload image"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {setImageUpload(e.target.files[0]);
                    }}/>

                <label className={styles.Label} htmlFor="postContent"> caption </label>
                <input className={styles.input} type="text" id="postContent" name="postContent" placeholder=" write a description..."/>

                <label className={styles.Label} htmlFor="friend">share with</label>
                <input className={styles.input} type="text" id="friend" name="friend" placeholder=" john smith"/>

                <button className={styles.button} type="submit">scrapbook</button>
            </form>
        </div>
    )
}

export default CreatePostForm;