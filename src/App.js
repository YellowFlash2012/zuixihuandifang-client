import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";

import Users from "./user/pages/Users";

function App() {

    const [token, setToken] = useState(false);

    const [userId, setUserId] = useState(false);

    const login = useCallback(
        (uid, token) => {
            setToken(token);
            setUserId(uid);
        },
        [],
    );
    
    const logout = useCallback(
        () => {
            setToken(null);
            setUserId(null);
        },
        [],
    );

    return (
        <div className="App">
            <AuthContext.Provider
                value={{
                    isLoggedIn: !!token, userId: userId,
                    login: login,
                    logout: logout,
                    token:token
                }}
            >
                <BrowserRouter>
                    <MainNavigation />
                    <main>
                        <Routes>
                            {token ? (
                                <>
                                    <Route path="/" element={<Users />} />

                                    <Route
                                        path="/places/new"
                                        element={<NewPlace />}
                                    />

                                    <Route
                                        path="/:userId/places"
                                        element={<UserPlaces />}
                                    />

                                    <Route
                                        path="/places/:placeId"
                                        element={<UpdatePlace />}
                                    />
                                </>
                            ) : (
                                <>
                                    <Route path="/" element={<Users />} />
                                    <Route
                                        path="/:userId/places"
                                        element={<UserPlaces />}
                                    />
                                    <Route path="/auth" element={<Auth />} />
                                </>
                            )}
                        </Routes>
                    </main>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
