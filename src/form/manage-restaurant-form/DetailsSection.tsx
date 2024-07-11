import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";

function DetailsSection() {
    const {control} = useFormContext();

    return (
        <div className={"space-y-2"}>
            <p className={"text-2xl font-bold"}>Details</p>
            <FormDescription>
                Description for form
            </FormDescription>
            <FormField control={control} name={"restaurantName"} render={({field})=> (
                <FormItem>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input {...field} className={"bg-white"}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <div className="flex w-full md:w-1/2 gap-4">
                <FormField control={control} name={"city"} render={({field})=> (
                    <FormItem>
                        <FormLabel>
                            City
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={control} name={"country"} render={({field})=> (
                    <FormItem>
                        <FormLabel>
                            Country
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            </div>
            <FormField control={control} name={"deliveryPrice"} render={({field})=> (
                <FormItem className={"max-w-[25%]"}>
                    <FormLabel>
                        Delivery Price
                    </FormLabel>
                    <FormControl>
                        <Input {...field} className={"bg-white"}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <FormField control={control} name={"estimatedDeliveryTime"} render={({field})=> (
                <FormItem className={"max-w-1/4"}>
                    <FormLabel>
                        Estimated Delivery Time (minutes)
                    </FormLabel>
                    <FormControl>
                        <Input {...field} className={"bg-white"} placeholder={"30"}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}

export default DetailsSection;