import {z} from 'zod';
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import DetailsSection from "@/form/manage-restaurant-form/DetailsSection.tsx";
import {Separator} from "@radix-ui/react-separator";
import CuisinesSection from "@/form/manage-restaurant-form/CuisinesSection.tsx";
import MenuSection from "@/form/manage-restaurant-form/MenuSection.tsx";
import ImageSection from "@/form/manage-restaurant-form/ImageSection.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form";
import {Restaurant} from "@/types.ts";
import {useEffect} from "react";


const formSchema = z.object({
        restaurantName: z.string({
            required_error: "Restaurant name is required",
        }),
        city: z.string({
            required_error: "City name is required",
        }),
        country: z.string({
            required_error: "Country name is required",
        }),
        deliveryPrice: z.coerce.number({
            required_error: "Delivery Price name is required",
            invalid_type_error: "Must be a valid number"
        }),
        estimatedDeliveryTime: z.coerce.number({
            required_error: "Est. delivery time is required",
            invalid_type_error: "Must be a valid number"
        }),
        cuisines: z.array(z.string()).nonempty({
            message: "Please select at least one cuisine.",
        }),
        menuItems: z.array(
            z.object({
                name: z.string().min(1, "Name is required"),
                price: z.coerce.number().min(1, "Price is required"),
            })
        ),
        imageUrl: z.string().optional(),
        imageFile: z.instanceof(File, { message: "image is required" }).optional(),
    })
    .refine((data) => data.imageUrl || data.imageFile, {
        message: "Either image URL or image File must be provided",
        path: ["imageFile"],
    });


type RestaurantFormData = z.infer<typeof formSchema>;


type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean
}


function ManageRestaurantForm({isLoading, onSave, restaurant} : Props) {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems:  [{
                name:"",
                price: 0
            }]
        }
    });

    useEffect(()=>{
        if(!restaurant){
            return;
        }

        // price lowest domination of 100 = 100pence == 1GBP
        const deliveryPriceFormatted = parseInt(
            (restaurant.deliveryPrice).toFixed(2)
        );

        const menuItemsFormatted = restaurant.menuItems.map((item: any) => ({
            ...item,
            price: parseInt((item.price).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted,
        };

        form.reset(updatedRestaurant);
    }, [form, restaurant])

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);

        // Price should be in rs
        formData.append(
            "deliveryPrice",
            formDataJson.deliveryPrice.toString()
        );
        formData.append(
            "estimatedDeliveryTime",
            formDataJson.estimatedDeliveryTime.toString()
        );
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(
                `menuItems[${index}][price]`,
                menuItem.price.toString()
            );
        });
        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }

        onSave(formData);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={"space-y-8 bg-gray-50 rounded-lg p-5 md:p-10"}
            >
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading ? (
                    <LoadingButton/>
                ):(
                    <Button type={"submit"}>Submit</Button>
                )
                }
            </form>
        </Form>
    );
}

export default ManageRestaurantForm;