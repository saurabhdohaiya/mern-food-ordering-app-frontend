import {useAuth0} from "@auth0/auth0-react";
import {Restaurant} from "@/types.ts";
import {toast} from "sonner";
import {useMutation, useQuery} from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    }

    const { data: restaurant, isLoading } = useQuery(
        "fetchMyRestaurant",
        getMyRestaurantRequest
    );

    return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();
    };

    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        error,
    } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
    }

    if (error) {
        toast.error("Error creating restaurant!");
    }

    return { createRestaurant, isLoading };

}

export const useUpateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to ate restaurant");
        }

        return response.json();
    };

    const {
        mutate: updateRestaurant,
        isLoading,
        isSuccess,
        error,
    } = useMutation(updateMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant Successfully Updated!");
    }

    if (error) {
        toast.error("Restaurant Updation Failed!");
    }

    return { updateRestaurant, isLoading };

}


