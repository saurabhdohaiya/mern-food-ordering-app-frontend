import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

function MobileNavLink() {
    const {logout} = useAuth0();
    return (
        <>
            <div className="flex flex-col gap-2">
                <Link
                    className="flex bg-white items-center hover:text-orange-500"
                    to="/user-profile">
                    User Profile
                </Link>
                <p onClick={()=> logout()}
                    className={"flex flex-1 hover:text-orange-500 hover:cursor-pointer"}>
                    Log Out
                </p>
            </div>
        </>
    );
}

export default MobileNavLink;