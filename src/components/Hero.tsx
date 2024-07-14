import hero from "../assets/images/hero.png";

function Hero() {
    return (
        <div>
            <img src={hero} className="w-full max-h-[35rem] object-cover" alt="hero" />
        </div>
    );
}

export default Hero;