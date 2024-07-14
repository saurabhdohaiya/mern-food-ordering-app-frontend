import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "../src/layouts/layout.tsx";
import HomePage from "../src/pages/HomePage.tsx"
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import DetailPage from "@/pages/DetailPage.tsx";

export const AppRoutes = ()=>{
    return (
        <Routes>
            <Route path="/" element={<Layout  showHero={true} children={<HomePage/>}/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
                <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage/></Layout>} />
            </Route>
            <Route path="/auth-callback" element={<AuthCallbackPage/>} />
            <Route path={"/search/:city"} element={
                <Layout showHero={false}>
                    <SearchPage/>
                </Layout>
            }/>
            <Route
                path="/detail/:restaurantId"
                element={
                    <Layout showHero={false}>
                        <DetailPage />
                    </Layout>
                }
            />
            <Route path="*" element={<Navigate to={"/"}/>} />
        </Routes>
    )
}

