
import React from 'react';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="h-screen bg-hero-pattern bg-cover bg-center flex flex-col justify-center items-center text-center text-white relative">
                <div className="z-10 p-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-gold drop-shadow-lg">
                        The Gilded Spoon
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-brand-light">
                        Where culinary craftsmanship meets timeless elegance.
                    </p>
                    <NavLink
                        to="/reservations"
                        className="mt-8 inline-block bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-sm text-md uppercase tracking-widest hover:bg-yellow-500 transition-all duration-300 shadow-lg"
                    >
                        Book a Table
                    </NavLink>
                </div>
            </section>

            {/* About Snippet Section */}
            <section className="py-20 bg-brand-dark">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-4xl font-serif text-brand-gold mb-6">A Taste of Perfection</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Nestled in the heart of the city, The Gilded Spoon offers an unforgettable dining experience. Our philosophy is simple: use the finest, locally-sourced ingredients to create innovative dishes that honor culinary traditions. Each plate is a work of art, designed to delight the senses.
                    </p>
                    <NavLink
                        to="/about"
                        className="mt-6 inline-block border border-brand-gold text-brand-gold font-bold py-2 px-6 rounded-sm text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
                    >
                        Our Story
                    </NavLink>
                </div>
            </section>
            
            {/* Featured Dishes Section */}
            <section className="py-20 bg-brand-gray">
                 <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif text-brand-gold mb-12 text-center">Chef's Recommendations</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-brand-dark p-6 rounded-lg shadow-xl text-center">
                             <img src="https://picsum.photos/400/300?random=1" alt="Seared Scallops" className="w-full h-48 object-cover rounded-md mb-4"/>
                            <h3 className="font-serif text-2xl text-brand-gold mb-2">Seared Scallops</h3>
                            <p className="text-gray-400 text-sm">With saffron risotto and a citrus buerre blanc.</p>
                        </div>
                         <div className="bg-brand-dark p-6 rounded-lg shadow-xl text-center">
                             <img src="https://picsum.photos/400/300?random=2" alt="Filet Mignon" className="w-full h-48 object-cover rounded-md mb-4"/>
                            <h3 className="font-serif text-2xl text-brand-gold mb-2">Filet Mignon</h3>
                            <p className="text-gray-400 text-sm">8oz center-cut, served with truffle mashed potatoes.</p>
                        </div>
                         <div className="bg-brand-dark p-6 rounded-lg shadow-xl text-center">
                            <img src="https://picsum.photos/400/300?random=3" alt="Lava Cake" className="w-full h-48 object-cover rounded-md mb-4"/>
                            <h3 className="font-serif text-2xl text-brand-gold mb-2">Molten Lava Cake</h3>
                            <p className="text-gray-400 text-sm">Decadent chocolate cake with a raspberry coulis.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
