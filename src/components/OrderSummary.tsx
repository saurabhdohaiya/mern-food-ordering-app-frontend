import {Restaurant} from "@/types.ts";
import {CartItem} from "@/pages/DetailPage.tsx";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Trash} from "lucide-react";


type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
}

function OrderSummary({ restaurant, cartItems, removeFromCart }: Props) {
    const getTotalCost = () => {
        const totalInRupees = cartItems.reduce((total, cartItem) =>
            total + cartItem.price * cartItem.quantity,
            0
        );

        return (totalInRupees + restaurant.deliveryPrice).toFixed(2);
    }
    return (
        <>
            <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight flex justify-between border-b border-dashed border-orange-500 pb-2">
                    <p>Your Order</p>
                    <span>Rs. {getTotalCost()}</span>
                </CardTitle>
                <CardContent className="flex flex-col gap-5 !p-1 text-sm border-b border-dashed border-orange-500 last:border-dashed last:border-orange-500">
                    {cartItems.map((cartItem) => (
                        <div className="flex justify-between last:border-dashed last:border-orange-500">
                            <span>
                              <Badge variant={"outline"} className="mr-2">
                                {cartItem.quantity}
                              </Badge>
                                {cartItem.name}
                            </span>
                            <span className="flex items-center gap-2">
                                Rs. {((cartItem.price * cartItem.quantity)).toFixed(2)}
                                <Trash
                                  className="cursor-pointer"
                                  color="red"
                                  size={20}
                                  onClick={()=>removeFromCart(cartItem)}
                                />
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>Rs. {(restaurant.deliveryPrice).toFixed(2)}</span>
                        </div>
                </CardContent>
            </CardHeader>
        </>
    );
}

export default OrderSummary;