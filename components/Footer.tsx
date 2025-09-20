
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black/50 text-brand-light py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-serif text-xl text-brand-gold mb-4">The Gilded Spoon</h3>
                        <p className="text-sm text-gray-400">Experience culinary artistry in an atmosphere of timeless elegance.</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl text-brand-gold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><NavLink to="/menu" className="hover:text-brand-gold transition-colors">Menu</NavLink></li>
                            <li><NavLink to="/reservations" className="hover:text-brand-gold transition-colors">Reservations</NavLink></li>
                            <li><NavLink to="/contact" className="hover:text-brand-gold transition-colors">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl text-brand-gold mb-4">Follow Us</h3>
                        <p className="text-sm text-gray-400">Stay connected for the latest updates and special events.</p>
                        {/* Social media icons would go here */}
                    </div>
                </div>
                <div className="mt-12 border-t border-brand-gray pt-6">
                    <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} The Gilded Spoon. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
