import {useMutation, useQuery} from "react-query";
import {useAuth0} from "@auth0/auth0-react";
import { toast } from "sonner";
import {User} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async () : Promise<User> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if(!response.ok) {
            toast.error(response.statusText);
            throw new Error("Error fetching user details");
        }
        return response.json();
    };

    const {data: currentUser, isLoading, error} = useQuery("fetchCurrentUser", getMyUserRequest);

    if(error){
        toast.error(error.toString());
    }

    return {
        currentUser,
        isLoading,
    };
};

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Error creating a new user");
        }
    };

    const{
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    };
};


type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
    postalCode: string;
};

export const useUpdateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest)=> {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(!response.ok) {
            throw new Error("Error updating user");
        }

        return response.json();
    };

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateMyUserRequest);

    if(isSuccess){
        toast.success("User Profile Successfully Updated!");
    }

    if(error){
        toast.error(error.toString());
        reset();
    }

    return {updateUser, isLoading};
}