import { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";

import Users from "./user/pages/Users";

let logoutTimer;

function App() {
    const [token, setToken] = useState(false);

    const [userId, setUserId] = useState(false);

    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

        // autologout functionality
        setTokenExpirationDate(tokenExpirationDate);

        // persist login state
        localStorage.setItem(
            "userData",
            JSON.stringify({ userId: uid, token: token, expiration:tokenExpirationDate.toISOString() })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);

        localStorage.removeItem("userData");
    }, []);

    // autologout
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();

            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token,logout,tokenExpirationDate])

    // auto login the user at startup
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (storedData && storedData.token && new Date(storedData.expiration)>new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    return (
        <div className="App">
            <AuthContext.Provider
                value={{
                    isLoggedIn: !!token,
                    userId: userId,
                    login: login,
                    logout: logout,
                    token: token,
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
