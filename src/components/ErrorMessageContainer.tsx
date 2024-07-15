
type Props = {
    errorMessage: string;
}

function ErrorMessageContainer({errorMessage}: Props) {
    return (
        <div className={"flex flex-1 text-sm items-center justify-center text-red-600 mt-[5rem]"}>
            {errorMessage}
        </div>
    );
}

export default ErrorMessageContainer;