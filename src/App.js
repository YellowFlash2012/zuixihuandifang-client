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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(
        () => {
            setIsLoggedIn(true);
        },
        [],
    );
    
    const logout = useCallback(
        () => {
            setIsLoggedIn(false);
        },
        [],
    );

    return (
        <div className="App">
            <AuthContext.Provider
                value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
            >
                <BrowserRouter>
                    <MainNavigation />
                    <main>
                        <Routes>
                            {isLoggedIn ? (
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
