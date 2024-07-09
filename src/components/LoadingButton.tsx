import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";

function LoadingButton() {
    return (
        <Button disabled className="flex gap-1">
            <Loader2 className={"mr-2 h-4 w-4 animate-spin"}/>
            Loading
        </Button>
    );
}

export default LoadingButton;