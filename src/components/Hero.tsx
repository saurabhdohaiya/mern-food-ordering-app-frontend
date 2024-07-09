import hero from "../assets/images/hero.png";

function Hero() {
    return (
        <div>
            <img src={hero} className="w-full hax-h-[37.5rem] object-cover" alt="hero" />
        </div>
    );
}

export default Hero;