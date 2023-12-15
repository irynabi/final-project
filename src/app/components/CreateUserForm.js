import styles from "./components.module.css"
import Link from "next/link"

const CreateUserForm= ( {createUserFunction}) => {
    return (
        <div>
            <form className={styles.Form} onSubmit={(e) => createUserFunction(e)}> 
                <label className={styles.Label}  htmlFor="name">name </label>
                <input className={styles.input} type="name" id="name" name="name" placeholder="john smith" />

                <label className={styles.Label}  htmlFor="email">email </label>
                <input className={styles.input} type="email" id="email" name="email" placeholder="email" />

                <label className={styles.Label} htmlFor="password">password</label>
                <input className={styles.input} type="password" id="password" name="password" placeholder="password" />
            
                <button className={styles.button} type="submit">create user</button>
                <Link href="/login" className={styles.suggest}>already have one? log in</Link>
            </form>
        </div>
    )
}

export default CreateUserForm;