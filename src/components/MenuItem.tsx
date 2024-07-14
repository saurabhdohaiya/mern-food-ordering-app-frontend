import { MenuItemType } from "../types";
import { Card, CardHeader} from "./ui/card";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    menuItem: MenuItemType;
    addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
    return (
        <Card className="cursor-pointer">
            {/*<CardHeader>*/}
            {/*    <CardTitle>{menuItem.name}</CardTitle>*/}
            {/*</CardHeader>*/}
            <CardHeader className="flex flex-row justify-between items-center">
                <p className={"text-base"}>{menuItem.name}</p>
                <div className={"flex flex-row justify-between items-center gap-2"}>
                    Rs. {(menuItem.price).toFixed(2)}
                    <Button
                        onClick={addToCart}
                        className="text-orange-500 bg-white border border-orange-500 hover:bg-orange-500 hover:text-white"
                    >
                        Add
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
};

export default MenuItem;