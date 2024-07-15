import {useParams} from "react-router-dom";
import {useGetRestaurant} from "@/api/RestaurantApi.tsx";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {Card, CardFooter} from "@/components/ui/card.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItem.tsx";
import {MenuItemType} from "@/types.ts";
import {useState} from "react";
import OrderSummary from "@/components/OrderSummary.tsx";
import {toast} from "sonner";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import {UserFormData} from "@/form/user-profile-form/UserProfileForm.tsx";
import {useCreateCheckoutSession} from "@/api/OrderApi.tsx";
import LoadingContainer from "@/components/LoadingContainer.tsx";
import ErrorMessageContainer from "@/components/ErrorMessageContainer.tsx";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

function DetailPage() {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();


    const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    if (isLoading || !restaurant) {
        return <LoadingContainer/>
    }

    const addToCart = (menuItem: MenuItemType) =>{
        toast.success("Add To Cart!");
        console.log("Add to cart");
        setCartItems((prevCartItems)=> {
            const existingCartItem = prevCartItems.find((cartItem) =>
                cartItem._id === menuItem._id
            );

            let updatedCartItems;

            if(existingCartItem){
                updatedCartItems = prevCartItems.map((cartItem) => {
                    return cartItem._id === menuItem._id
                        ? {...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem;
                });
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    },
                ];
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;

        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            // return prevCartItems.filter(
            //     (item) => {
            //         return item._id !== cartItem._id
            //     }
            // );

            const updatedCartItems = prevCartItems.map(item => ({ ...item }));

            // Find the item to update or remove
            for (let i = 0; i < updatedCartItems.length; i++) {
                if (updatedCartItems[i]._id === cartItem._id) {
                    if (updatedCartItems[i].quantity > 1) {
                        updatedCartItems[i].quantity--;
                    } else {
                        updatedCartItems.splice(i, 1);
                    }
                    break;
                }
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const onCheckout = async (useFormData: UserFormData) => {
        if(!restaurant){
            return <ErrorMessageContainer errorMessage={"Error 404: No Restaurant Found :("}/>
        }

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString()
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: useFormData.name,
                addressLine1: useFormData.addressLine1,
                postalCode: useFormData.postalCode,
                city: useFormData.city,
                country: useFormData.country,
                email: useFormData.email as string,
            }
        };

        // return checkoutData;
        // console.log(checkoutData, useFormData);
        // return checkoutData;

        const data = await createCheckoutSession(checkoutData);
        if(!data.url){
            toast.error("No checkout data.");
        }
        sessionStorage.removeItem(`cartItems-${restaurantId}`);
        window.location.href = data.url;
    };



    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>

            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-0">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant}/>
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem
                            menuItem={menuItem}
                            addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;