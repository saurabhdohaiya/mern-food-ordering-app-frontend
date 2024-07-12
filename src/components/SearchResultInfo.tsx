import {Link} from "react-router-dom";

type Props = {
    total: number
    city: string
}

function SearchResultInfo({total, city}: Props) {
    return (
        <div className="text-base font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <p>{total} Restaurants found in {city}
                <Link
                    to={"/"}
                    className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
                >
                    Change Location
                </Link>
            </p>
        </div>
    );
}

export default SearchResultInfo;