import {useAuth0} from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import UserProfileForm, {UserFormData} from "@/form/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser} from "@/api/MyUserApi.tsx";
import {Dialog, DialogContent, DialogTrigger} from "../components/ui/dialog";

type Props = {
    disabled?: boolean;
    isLoading:boolean;
    onCheckout: (userFormData: UserFormData)=>void;
}

function CheckoutButton({disabled, isLoading, onCheckout}: Props) {
    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0();

    const {pathname} = useLocation();

    const {currentUser, isLoading: isGetUserLoading} = useGetMyUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        });
    }

    if(!isAuthenticated) {
        return (
            <Button
                className={"bg-orange-500 flex-1"}
                onClick={onLogin}
            >Log In to Check Out</Button>
        );
    }

    if(isAuthLoading || !currentUser || isLoading) {
        return (
            <LoadingButton/>
        );
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">
                    Go to Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    title="Confirm Deliery Details"
                    buttonText="Proceed to Payment"
                />
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutButton;