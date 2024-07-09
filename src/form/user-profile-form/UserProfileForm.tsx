import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {User} from "@/types.ts";
import {useEffect} from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    city: z.string().min( 1, "City is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
}

function UserProfileForm ({onSave, isLoading, currentUser} : Props) {
    // const user = currentUser.user;
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    // For re-rendering if the user changes
    useEffect(()=>{
        form.reset(currentUser);
    }, [currentUser, form]);


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className={"space-y-4 bg-gray-50 rounded-lg p-5 md:p-10"}
            >
                <div>
                    <p className={"text-2xl"}>User Profile Form</p>
                    <FormDescription>
                        View and change your profile information
                    </FormDescription>
                </div>
                <FormField control={form.control} name={"email"} render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>

                    </FormItem>
                )}/>
                <FormField control={form.control} name={"name"} render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>

                    </FormItem>
                )}/>
                <div className="flex flex-col md:flex-row items-center justify-center w-full md:justify-between gap-4">
                    <div className={"w-full md:w-1/2"}>
                        <FormField control={form.control} name={"addressLine1"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} className={"bg-white"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <div className={"w-full md:w-1/2"}>
                        <FormField control={form.control} name={"city"} render={({field}) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className={"bg-white"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center w-full md:justify-between gap-4">
                    <div className={"w-full md:w-1/2"}>
                        <FormField control={form.control} name={"postalCode"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input {...field} className={"bg-white"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <div className="w-full md:w-1/2">
                        <FormField control={form.control} name={"country"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className={"bg-white"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingButton/>
                ) : (
                    <Button type="submit" className={"bg-orange-500"}>
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    );
}

export default UserProfileForm;