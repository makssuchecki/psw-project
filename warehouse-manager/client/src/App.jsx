import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const API = "https://localhost:3000"

export default function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API}/auth/logged`, {
                    credentials: "include"
                });
                if (res.ok){
                    setToken(true);
                }else{
                    setToken(null);
                }
            }catch {
                setToken(null);
            }
        };
        checkAuth();
    }, [])

    const logout = async () => {
        try{
            await fetch(`${API}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })}catch(e){}

        setToken(false)
    }


    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={!token ? <Login setToken={setToken} api={API} /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute token={token}>
                            <Dashboard token={token} logout={logout} api={API}/>        
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/"
                    element={!token ? <Navigate to="/login"/> : <Navigate to="/dashboard" />}
                />

                <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}