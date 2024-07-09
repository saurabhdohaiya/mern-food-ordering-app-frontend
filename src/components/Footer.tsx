// import React from 'react';

function Footer() {
    return (
        <div className="bg-orange-500 py-10">
            <div className="container flex flex-col justify-between items-center md:flex-row mx-auto">
                <p className="text-3xl text-white font-bold tracking-tight">
                    MernEats
                </p>
                <div className="flex gap-4 text-white font-bold tracking-tight">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;