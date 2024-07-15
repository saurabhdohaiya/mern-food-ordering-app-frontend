// import React from 'react';

function Footer() {
    return (
        <div className="bg-orange-500 py-5">
            <div className="container flex flex-col justify-between items-center md:flex-row mx-auto">
                <p className="text-2xl text-white font-bold tracking-tight">
                    Zesty:)
                </p>
                <div className="flex gap-4 text-white text-sm tracking-tight">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;