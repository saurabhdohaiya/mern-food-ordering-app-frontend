import landingImage from "../assets/images/landing.png";
import appDownloadImage from "../assets/images/appDownload.png";
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";
import { Top_Searched_Cities } from "@/config/top-searched-cities";

function HomePage() {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    const handleTopSearchCitySubmit = (city: string) => {
        navigate({ 
            pathname: `/search/${city}`,
        });
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col bg-white rounded-lg shadow-md py-8 gap-5 text-center -mt-16 px-4">
                 <p className="text-4xl font-bold tracking-tight text-orange-600">
                     Tuck into a take-away today
                 </p>
                <div className="text-sm">
                    Food is just a click away.
                </div>
                <SearchBar
                    placeHolder="Search by City or Town"
                    onSubmit={handleSearchSubmit}
                />
                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 items-center justify-between md:justify-start gap-1 md:gap-2">
                    {Top_Searched_Cities.map((city)=> {
                        return <span className="border rounded-full py-1 px-2 hover:bg-orange-600 hover:text-white hover:border-orange-600 hover:animate-in hover:font-bold hover:cursor-pointer" onClick={()=>handleTopSearchCitySubmit(city.name)}>
                            {city.title}
                        </span>
                    })}
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} alt="landingImg"/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="text-3xl font-bold tracking-tight text-orange-600">
                        Order takeaway even faster!
                    </div>
                    <div className="flex text-sm">
                        <p>Download the Zesty:) app for faster takeaway</p>
                    </div>
                    <img src={appDownloadImage} alt="appDownloadlandImg"/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;