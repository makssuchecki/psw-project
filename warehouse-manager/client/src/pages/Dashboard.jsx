import SensorsLive from "../components/SensorsLive";
import AlertsLive from "../components/AlertsLive";
import VehiclesLive from "../components/VehiclesLive";
import Packages from "../components/Packages";

export default function Dashboard({token, logout, api}){


    return (
        <div>
            <p>{token}</p>
            <button onClick={logout}>Wyloguj</button>

            <Packages api={api} token={token} />
            <SensorsLive />
            <AlertsLive api={api}/>
            <VehiclesLive />
        </div>
    )
}