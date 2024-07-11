import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    cuisine: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox = ({ cuisine, field }: Props) => {
    const valueArray = Array.isArray(field.value) ? field.value : [];

    return (
        <FormItem className={"flex flex-row items-center space-x-1 space-y-0 mt-2"}>
            <FormControl>
                <Checkbox
                    className={"bg-white"}
                    checked={valueArray.includes(cuisine)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            field.onChange([...valueArray, cuisine]);
                        } else {
                            field.onChange(
                                valueArray.filter((value: string) => value !== cuisine)
                            );
                        }
                    }}
                />
            </FormControl>
            <FormLabel className={"text-sm font-normal"}>
                {cuisine}
            </FormLabel>
        </FormItem>
    );
}

export default CuisineCheckbox;
