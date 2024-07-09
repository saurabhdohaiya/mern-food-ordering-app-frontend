import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "../src/layouts/layout.tsx";
import HomePage from "../src/pages/HomePage.tsx"
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";

export const AppRoutes = ()=>{
    return (
        <Routes>
            <Route path="/" element={<Layout  showHero={true} children={<HomePage/>}/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
            </Route>
            <Route path="/auth-callback" element={<AuthCallbackPage/>} />
            <Route path="*" element={<Navigate to={"/"}/>} />
        </Routes>
    )
}

