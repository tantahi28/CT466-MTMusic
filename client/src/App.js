import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";
import 'bootstrap/dist/css/bootstrap.min.css';

SuperTokens.init(SuperTokensConfig);

function App() {

    const [userRole, setUserRole] = useState();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user');
                const role = response.data.userInfo.role[0];
                // console.log((response.data.userInfo.role[0]))
                setUserRole(role);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);
    
    return (
        <SuperTokensWrapper>
            <ComponentWrapper>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), PreBuiltUIList)}

                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */    
                                        <SessionAuth>
                                            {userRole === 'Admin' ? <AdminLayout /> : <MainLayout />}
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/admin"
                                    element={
                                        <MainLayout></MainLayout>
                                    }
                                />
                                <Route
                                    path="/playlist"
                                    element={
                                        <MainLayout></MainLayout>
                                    }
                                />
                                <Route
                                    path="/album"
                                    element={
                                        <MainLayout></MainLayout>
                                    }
                                />
                                <Route
                                    path="/user"
                                    element={
                                        <MainLayout></MainLayout>
                                    }
                                />
                                
                            </Routes>
                        </div>
                    </Router>
                </div>
            </ComponentWrapper>
        </SuperTokensWrapper>
    );
}

export default App;


