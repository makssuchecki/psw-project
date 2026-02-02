import styles from "./Sidebar.module.css"
export default function Sidebar({logout}){
    return(
        <div className={styles.mainDiv}>
            <p className={styles.adminPanel}>Panel Administratora</p>
            <button className={styles.logoutBtn} onClick={logout}>Wyloguj</button>
        </div>
    )
}