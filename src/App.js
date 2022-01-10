import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import Users from "./user/pages/Users";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <MainNavigation />
                <main>
                    <Routes>
                        <Route path="/" element={<Users />} />

                        <Route path="/places/new" element={<NewPlace />} />

                        <Route
                            path="/:userId/places"
                            element={<UserPlaces />}
                        />

                        <Route
                            path="/places/:placeId"
                            element={<UpdatePlace />}
                        />
                        
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        
                        <Route
                            path="/register"
                            element={<Register />}
                        />
                        

                        
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
