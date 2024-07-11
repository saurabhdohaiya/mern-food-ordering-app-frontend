import {useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {cuisineList} from "@/config/restaurant-options-config.ts";
import CuisineCheckbox from "@/form/manage-restaurant-form/CuisineCheckbox.tsx";

function CuisinesSection() {
    const { control } = useFormContext();

    return (
        <div className={"space-y-2"}>
            <p className={"text-2xl font-bold"}>Cuisines</p>
            <FormDescription>
                Select the cuisine your restaurant serve
            </FormDescription>
            <FormField
                control={control}
                name="cuisines"
                render={({field}) => (
                <FormItem>
                    <div className={"grid md:grid-cols-5 gap-1"}>
                        {cuisineList.map((cuisineItem) => (
                                <CuisineCheckbox cuisine={cuisineItem} field={field}/>
                            )
                        )}
                    </div>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}

export default CuisinesSection;