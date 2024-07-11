import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    index: number,
    removeMenuItem: () => void;
}

const MenuItemInput = ({index, removeMenuItem}: Props) => {
    const {control} = useFormContext();

    const showFormData = () => {
        console.log("menu Item Data: ", control);
    }
    return(
        <div className="flex flex-row items-end gap-2">
            <FormField
                name={`menuItems.${index}.name`}
                control={control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel className={"flex items-center gap-1"}>
                            Name
                            <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"Cheese Pizza ..."} className={"bg-white"}/>
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({field})=>(
                    <FormItem>
                        <FormLabel className={"flex items-center gap-1"}>
                            Price ($)
                            <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"$ 9.09"} className={"bg-white"}/>
                        </FormControl>
                    </FormItem>
                )}
            />

            <Button
                type="button"
                onClick={removeMenuItem}
                className={"bg-red-500 max-h-fit"}
            >
                Remove
            </Button>

            <Button
                type="button"
                onClick={showFormData}
                className={"bg-red-500 max-h-fit"}
            >
                Test Button
            </Button>

        </div>
    )
};


export default MenuItemInput;

