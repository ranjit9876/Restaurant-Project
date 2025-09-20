
import React, { useState, useEffect } from 'react';
import { generateMenuDescriptions } from '../services/geminiService';
import type { MenuItem } from '../types';

const initialMenuItems: Omit<MenuItem, 'description'>[] = [
    // Appetizers
    { name: 'Burrata Caprese', price: '$18', category: 'Appetizers' },
    { name: 'Tuna Tartare', price: '$22', category: 'Appetizers' },
    { name: 'Grilled Octopus', price: '$24', category: 'Appetizers' },
    // Main Courses
    { name: 'Pan-Seared Salmon', price: '$36', category: 'Main Courses' },
    { name: 'Duck Confit', price: '$38', category: 'Main Courses' },
    { name: 'Wagyu Steak Frites', price: '$55', category: 'Main Courses' },
    { name: 'Mushroom Risotto', price: '$29', category: 'Main Courses' },
    // Desserts
    { name: 'Crème Brûlée', price: '$14', category: 'Desserts' },
    { name: 'Chocolate Nemesis Cake', price: '$15', category: 'Desserts' },
    { name: 'Artisanal Cheese Platter', price: '$20', category: 'Desserts' },
     // Drinks
    { name: 'Classic Old Fashioned', price: '$16', category: 'Drinks' },
    { name: 'Spicy Margarita', price: '$17', category: 'Drinks' },
    { name: 'Espresso Martini', price: '$18', category: 'Drinks' },
];

const Menu: React.FC = () => {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                setLoading(true);
                const fullMenu = await generateMenuDescriptions(initialMenuItems);
                setMenu(fullMenu);
            } catch (err) {
                console.error(err);
                setError('Failed to load our menu. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    const renderMenuCategory = (category: MenuItem['category']) => {
        const items = menu.filter(item => item.category === category);
        if (items.length === 0 && !loading) return null;

        return (
            <div key={category} className="mb-12">
                <h2 className="text-4xl font-serif text-brand-gold mb-8 text-center">{category}</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                             <div key={index} className="animate-pulse">
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                                </div>
                                <div className="h-4 bg-gray-700 rounded w-full mt-2"></div>
                            </div>
                        ))
                    ) : (
                        items.map((item) => (
                            <div key={item.name} className="py-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-serif text-xl text-brand-light">{item.name}</h3>
                                    <span className="flex-grow border-b border-dashed border-gray-600 mx-2"></span>
                                    <p className="text-brand-gold font-bold">{item.price}</p>
                                </div>
                                <p className="text-sm text-gray-400 mt-1 italic">{item.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="py-20 bg-brand-dark">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-serif font-bold text-center text-brand-gold mb-4">Our Menu</h1>
                <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">Discover a symphony of flavors crafted with passion by our award-winning chefs.</p>
                
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {renderMenuCategory('Appetizers')}
                {renderMenuCategory('Main Courses')}
                {renderMenuCategory('Desserts')}
                {renderMenuCategory('Drinks')}
            </div>
        </div>
    );
};

export default Menu;
