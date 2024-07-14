import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {CircleUserRound} from "lucide-react";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";

function UserNavMenu() {
    const {user, logout} = useAuth0();
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 gap-2">
                    {user?.email}
                    <CircleUserRound className="hover:text-orange-500"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link to="/user-profile" className="hover:text-orange-500">
                            User Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to="/manage-restaurant" className="hover:text-orange-500">
                            Manage Restaurant
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to="/order-status" className="hover:text-orange-500">
                            Manage Order
                        </Link>
                    </DropdownMenuItem>
                   <Separator/>
                    <DropdownMenuItem>

                        <div
                            className="flex justify-center items-center w-full rounded-md p-2 bg-orange-500 text-white hover:text-orange-500 hover:bg-white hover:cursor-pointer hover:border-2 hover:border-orange-500"
                            onClick={()=> logout()}
                        >
                            Log Out
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default UserNavMenu;