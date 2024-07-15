import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Search} from "lucide-react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required",
    })
})

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
};

const SearchBar = ({onSubmit, searchQuery, placeHolder, onReset }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: searchQuery || ""
        }
    });

    useEffect((()=>{
        form.reset({searchQuery: searchQuery});
    }), [searchQuery, form]);

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });

        if (onReset) {
            onReset();
        }
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 px-6 ${
                    form.formState.errors.searchQuery && "border-red-500"
                }`}
            >
                <Search
                    strokeWidth={2.5}
                    size={25}
                    className="ml-1 text-orange-500 hidden md:block"
                />
                <FormField
                    name="searchQuery"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-none text-sm shadow-none focus-visible:ring-0"
                                    placeholder={placeHolder}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    onClick={handleReset}
                    type="button"
                    variant="outline"
                    className="rounded-full"
                >
                    Reset
                </Button>

                <Button type="submit" className="rounded-full bg-orange-500">
                    Search
                </Button>
            </form>
        </Form>
    );
}



export default SearchBar;