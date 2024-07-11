import {useFieldArray, useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
    const { control } = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: "menuItems",
    });

    return (
        <div className={"space-y-2"}>
            <div>
                <p className={"font-bold text-2xl"}>Menu</p>
                <FormDescription>
                    Create your menu and give each item a name and price
                </FormDescription>
            </div>
            <FormField
                name="menuItems"
                control={control}
                render={() => (
                    <FormItem className={"flex flex-col gap-2"}>
                        {fields.map((_, index)=>(
                            <MenuItemInput
                                index={index}
                                removeMenuItem={()=>remove(index)}
                            />
                        ))}
                </FormItem>
            )}/>
            <Button
                type="button"
                onClick={() => append({name: "", price: ""})}>
                Add Item
            </Button>
        </div>
    )
};

export default  MenuSection