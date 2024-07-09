import landingImage from "../assets/images/landing.png";
import appDownloadImage from "../assets/images/appDownload.png";

function HomePage() {
    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col bg-white rounded-lg shadow-md py-8 gap-5 text-center -mt-16">
                 <p className="text-5xl font-bold tracking-tight text-orange-600">
                     Tuck into a take-away today
                 </p>
                <div className="text-xl">
                    Food is just a click away.
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} alt="landingImg"/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="text-3xl font-bold tracking-tight text-orange-600">
                        Order takeaway even faster!
                    </div>
                    <div className="flex">
                        <p>Download the MernEats app for faster takeaway</p>
                    </div>
                    <img src={appDownloadImage} alt="appDownloadlandImg"/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;