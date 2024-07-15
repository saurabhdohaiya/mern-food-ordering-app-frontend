import UserProfileForm from "@/form/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi.tsx";
import LoadingContainer from "@/components/LoadingContainer.tsx";
import ErrorMessageContainer from "@/components/ErrorMessageContainer.tsx";

function UserProfilePage() {
    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();

    if(isGetLoading){
        return (
            <LoadingContainer/>
        );
    }

    if(!currentUser){
        return (
            <ErrorMessageContainer errorMessage={"Error 404: Unable to Load User Data :("}/>
        )
    }

    return (
        <div>
            <UserProfileForm
                currentUser={currentUser}
                onSave={updateUser}
                isLoading={isUpdateLoading}
            />
        </div>
    );
}

export default UserProfilePage;