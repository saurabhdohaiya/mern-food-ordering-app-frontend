import {useParams} from "react-router-dom";
import {useSearchRestaurants} from "@/api/RestaurantApi.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import {Restaurant} from "@/types.ts";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import {useState} from "react";
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import CuisineFilter from "@/components/CuisineFilter.tsx";
import SortOptionDropdown from "@/components/SortOptionDropdown.tsx";
import LoadingContainer from "@/components/LoadingContainer.tsx";
import ErrorMessageContainer from "@/components/ErrorMessageContainer.tsx";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

function SearchPage() {
    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1
        }));
    };

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    };

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    };

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery || "",
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    };

    if (isLoading) {
        return (<LoadingContainer/>);
    }

    if(!results?.data || !city){
        return <ErrorMessageContainer errorMessage={"Error 404: No Result Found :("}/>
    }

    if(results?.data.length === 0){
        return <ErrorMessageContainer errorMessage={`Error 404: No Registered Restaurant found in ${city}. Try Different City :(`}/>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-4">
            <div id={"cuisines-list"}>
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => {
                        setIsExpanded((prevState) => !prevState);
                    }}
                />
            </div>
            <div id={"main-content"} className="flex flex-col gap-5 animate-in">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder={"Search by Cuisine or Restaurant Name"}
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city}/>
                    <SortOptionDropdown
                        sortOption={searchState.sortOption}
                        onChange={(value) => setSortOption(value)}
                    />
                </div>
                {results.data.map((restaurant: Restaurant) => (
                    <SearchResultCard restaurant={restaurant}/>
                ))}
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}

export default SearchPage;