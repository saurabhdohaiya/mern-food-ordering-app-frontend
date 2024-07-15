import {Loader2} from "lucide-react";

function LoadingContainer() {
    return (
        <div className={"flex flex-1 gap-0.5 justify-center items-center mt-[5rem] text-sm"}>
            <Loader2 className={"mr-2 h-4 w-4 animate-spin text-orange-500"}/>
            Loading
        </div>
    );
}

export default LoadingContainer;