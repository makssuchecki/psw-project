import SensorsLive from "../components/SensorsLive";
import AlertsLive from "../components/AlertsLive";
import VehiclesLive from "../components/VehiclesLive";
import Packages from "../components/Packages";
import styles from "./Dashboard.module.css"
import Sidebar from "../components/Sidebar";

export default function Dashboard({ logout, api}){


    return (
        <>  
            <div className={styles.navBar}>
                <p className={styles.mainTitle}>Warehouse   Manager</p>
            </div>
            <div className={styles.sideMain}>
                <Sidebar logout={logout} />
                <div className={styles.dashDiv}>
                    <div className={styles.mainDiv}>
                        <Packages api={api} />
                        <SensorsLive />
                        <div className={styles.vehiclesLive}>
                            <VehiclesLive />
                        </div>
                        <div className={styles.alertsLive}>
                            <AlertsLive api={api} />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}