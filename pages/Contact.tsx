
import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="py-20 bg-brand-dark">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-serif font-bold text-center text-brand-gold mb-16">Get In Touch</h1>
                
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
                    {/* Contact Info */}
                    <div className="space-y-8 text-brand-light">
                        <div>
                            <h2 className="font-serif text-2xl text-brand-gold mb-2">Address</h2>
                            <p className="text-gray-300">123 Culinary Lane, Metropolis, 10101</p>
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-gold mb-2">Reservations</h2>
                            <p className="text-gray-300">Phone: (555) 123-4567</p>
                            <p className="text-gray-300">For parties larger than 8, please call us directly.</p>
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-gold mb-2">Hours of Operation</h2>
                            <div className="text-gray-300">
                                <p><span className="font-semibold">Monday - Thursday:</span> 5:00 PM - 10:00 PM</p>
                                <p><span className="font-semibold">Friday - Saturday:</span> 5:00 PM - 11:00 PM</p>
                                <p><span className="font-semibold">Sunday:</span> 5:00 PM - 9:00 PM</p>
                            </div>
                        </div>
                         <div>
                            <h2 className="font-serif text-2xl text-brand-gold mb-2">Private Events</h2>
                            <p className="text-gray-300">Host your next special occasion with us. Email us at events@thegildedspoon.com for inquiries.</p>
                        </div>
                    </div>
                    
                    {/* Map Placeholder */}
                    <div className="h-96 bg-brand-gray rounded-lg shadow-xl flex items-center justify-center">
                       <p className="text-gray-500 text-lg">Map of 123 Culinary Lane</p>
                       {/* In a real app, this would be an embedded map component */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
