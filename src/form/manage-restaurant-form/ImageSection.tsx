import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";

function ImageSection() {
    const {control, watch} = useFormContext();

    const existingImageUrl = watch("imageUrl");

    return (
        <div className={"space-y-2"}>
            <div>
                <p className={"text-2x font-bold"}>Image</p>
            </div>
            <FormDescription>
                Add an image that will be displayed on the restaurant listing in the search result.
                Adding a new image will overwrite the existing one.
            </FormDescription>

            <div className={"flex flex-col gap-8 justify-center md:w-1/2"}>
                {existingImageUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={existingImageUrl}
                            className="rounded-md object-cover size-full"
                        />
                    </AspectRatio>
                )}
                <FormField control={control} name={"imageFile"} render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input className={"bg-white"} type={"file"} accept={".jpeg, jpg, .png"}
                            onChange={(event) =>
                                field.onChange(event.target.files ? event.target.files[0] : null
                                )
                            }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
        </div>
    );
}

export default ImageSection;