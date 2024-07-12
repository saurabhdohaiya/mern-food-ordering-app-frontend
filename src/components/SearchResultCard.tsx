import {Restaurant} from "@/types.ts";
import {Link} from "react-router-dom";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {Banknote, Clock, Dot} from "lucide-react";

type Props = {
    restaurant: Restaurant;
};

const SearchResultCard = ({restaurant}: Props) => {
    return (
        <Link
            to={`/detail/${restaurant._id}`}
            className="grid lg:grid-cols-[2fr_3fr] gap-2 group border border-gray-200 hover:border hover:border-orange-500 rounded-md p-2"
        >
            <AspectRatio ratio={16 / 9} className={"border border-gray-200 rounded-md p-1"}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md w-full h-full object-cover"
                />
            </AspectRatio>
            <div>
                <h3 className="text-xl tracking-tight mb-2">
                    {restaurant.restaurantName}
                </h3>
                <div id="card-content" className="grid md:grid-cols-[3fr_2fr] gap-2">
                    <div className="flex flex-row flex-wrap">
                        {restaurant.cuisines.map((item, index) =>
                                <span className="flex text-sm" key={index}>
                                <span>{item}</span>
                                    {index < restaurant.cuisines.length - 1 && <Dot size={18}/>}
                        </span>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col ">
                        <div className={`flex items-center gap-1 text-xs ${restaurant.estimatedDeliveryTime >= 60 ? "text-red-500" : (restaurant.estimatedDeliveryTime > 30 ? "text-orange-500" : "text-green-600")}`}>
                            <Clock size={18} />
                            {restaurant.estimatedDeliveryTime} mins
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <Banknote size={18}  />
                            Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultCard;