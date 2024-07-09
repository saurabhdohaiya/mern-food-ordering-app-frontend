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
                   <Separator/>
                    <DropdownMenuItem>
                        <p
                            className="hover:text-orange-500 hover:cursor-pointer"
                            onClick={()=> logout()}
                        >
                            Log Out
                        </p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default UserNavMenu;