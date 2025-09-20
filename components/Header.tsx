
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `block py-2 px-4 text-center text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive ? 'text-brand-gold' : 'text-brand-light hover:text-brand-gold'
            }`
        }
    >
        {children}
    </NavLink>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="bg-brand-dark/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-lg shadow-black/20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-serif font-bold text-brand-gold tracking-wider">
                    The Gilded Spoon
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-2">
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/menu">Menu</NavItem>
                    <NavItem to="/about">About</NavItem>
                    <NavItem to="/gallery">Gallery</NavItem>
                    <NavItem to="/contact">Contact</NavItem>
                    <NavLink
                        to="/reservations"
                        className="ml-4 bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-sm text-sm uppercase tracking-widest hover:bg-yellow-500 transition-all duration-300"
                    >
                        Reservations
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-brand-dark/95 backdrop-blur-sm">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavItem to="/" onClick={closeMenu}>Home</NavItem>
                        <NavItem to="/menu" onClick={closeMenu}>Menu</NavItem>
                        <NavItem to="/about" onClick={closeMenu}>About</NavItem>
                        <NavItem to="/gallery" onClick={closeMenu}>Gallery</NavItem>
                        <NavItem to="/contact" onClick={closeMenu}>Contact</NavItem>
                        <div className="p-4">
                        <NavLink
                            to="/reservations"
                            onClick={closeMenu}
                            className="w-full text-center block bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-sm text-sm uppercase tracking-widest hover:bg-yellow-500 transition-all duration-300"
                        >
                            Reservations
                        </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
