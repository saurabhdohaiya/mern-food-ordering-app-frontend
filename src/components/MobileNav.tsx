import {CircleUserRound, Menu} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "./ui/sheet.tsx";
import {Button} from "./ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";
import MobileNavLink from "@/components/MobileNavLink.tsx";

const MobileNav = () => {
    const {user, loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-orange-500"/>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                {user?.email}
                                <CircleUserRound className="hover:text-orange-500"/>
                            </div>
                        ):(
                            <p>Welcome to Zesty :)</p>
                        )}
                    </SheetTitle>
                    <div className="border my-4"></div>
                    <SheetDescription className="flex">
                        {isAuthenticated ?
                            (<MobileNavLink/>)
                            : (
                                <Button className="flex-1 font-bold bg-orange-500" onClick={async () => await loginWithRedirect()}>Log In</Button>
                            )}
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </>
    )
};

export default MobileNav;