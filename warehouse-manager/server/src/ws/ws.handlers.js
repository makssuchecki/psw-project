import * as alertsService from "../services/alerts.service.js";

export const handleMessage = (data, { broadcast }) => {
    if (data.type === "alert.create"){
        handleCreateAlert(data, broadcast)
    }
}

const handleCreateAlert = (data, broadcast) => {
    const alert = alertsService.createCustomAlert(data.message, data.severity)

    broadcast({
        type: "alert.new",
        payload: alert
    });
};



