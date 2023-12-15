import styles from "./components.module.css"

const LoginForm = ({loginUser}) => {
    return (
        <div>        
            <form className={styles.Form} onSubmit={(e) => loginUser(e)}>
                <label className={styles.Label} htmlFor="email">email </label>
                <input className={styles.input} type="email"  id="email" name="email" placeholder="email"/>

                <label className={styles.Label} htmlFor="password">password</label>
                <input className={styles.input} type="password" id="password" name="password" placeholder="password" />

                <button className={styles.button} type="submit">login</button>
                <a href="/createUser" className={styles.suggest}>don't have an account? create one</a>
            </form>
        </div>
    )
}

export default LoginForm;