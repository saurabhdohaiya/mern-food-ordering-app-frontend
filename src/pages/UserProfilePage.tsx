import UserProfileForm from "@/form/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi.tsx";

function UserProfilePage() {
    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();

    if(isGetLoading){
        return <div>Loading...</div>;
    }

    if(!currentUser){
        return <div>Unable to load user profile data.</div>;
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