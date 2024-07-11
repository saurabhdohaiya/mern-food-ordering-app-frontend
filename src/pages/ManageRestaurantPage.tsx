import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateMyRestaurant, useGetMyRestaurant, useUpateMyRestaurant} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading} = useUpateMyRestaurant();

    const isEditing = !!restaurant;

    return <ManageRestaurantForm
            restaurant={restaurant}
            onSave={ isEditing ? updateRestaurant : createRestaurant }
            isLoading={isCreateLoading || isUpdateLoading}
        />
}

export default ManageRestaurantPage;