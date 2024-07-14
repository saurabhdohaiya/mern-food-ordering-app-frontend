import {Button} from "./ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";
import UserNavMenu from "@/auth/UserNavMenu.tsx";
import {Link} from "react-router-dom";

const MainNav = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        <>
            <div className="flex space-x-2 items-center justify-between">
                {isAuthenticated ? (
                    <>
                        <Link to="/order-status" className="hover:text-orange-500 font-bold">
                            Your Orders
                        </Link>
                        <UserNavMenu/>
                    </>
                ) : (
                    <Button
                        variant="ghost"
                        className="font-bold bg-orange-500 text-white hover:text-orange-500 hover:bg-white hover:border-2 hover:border-orange-500"
                        onClick={async () => await loginWithRedirect()}
                    >
                        Log In
                    </Button>
                )}
            </div>
        </>
    )
};

export default MainNav;