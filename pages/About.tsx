
import React, { useState, useEffect } from 'react';
import { generateAboutUsStory } from '../services/geminiService';

const About: React.FC = () => {
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            setLoading(true);
            const generatedStory = await generateAboutUsStory();
            setStory(generatedStory);
            setLoading(false);
        };
        fetchStory();
    }, []);

    return (
        <div className="py-20 bg-brand-dark">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-serif font-bold text-center text-brand-gold mb-16">Our Culinary Journey</h1>
                
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <div>
                        <img 
                            src="https://picsum.photos/800/600?random=10" 
                            alt="Restaurant Interior" 
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="text-gray-300 leading-relaxed space-y-4">
                        {loading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-700 rounded w-full mt-4"></div>
                                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                            </div>
                        ) : (
                           story.split('\n').map((paragraph, index) => (
                               <p key={index}>{paragraph}</p>
                           ))
                        )}
                    </div>
                </div>

                 <div className="text-center mt-24">
                    <h2 className="text-4xl font-serif text-brand-gold mb-10">Meet the Artisans</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-12">
                        <div className="text-center">
                            <img src="https://picsum.photos/200/200?random=11" alt="Head Chef" className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-brand-gold shadow-lg"/>
                            <h3 className="font-serif text-xl">Chef Julian Valmont</h3>
                            <p className="text-brand-gold text-sm">Executive Chef</p>
                        </div>
                         <div className="text-center">
                            <img src="https://picsum.photos/200/200?random=12" alt="Pastry Chef" className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-brand-gold shadow-lg"/>
                            <h3 className="font-serif text-xl">Anaïs Dubois</h3>
                            <p className="text-brand-gold text-sm">Head Pastry Chef</p>
                        </div>
                    </div>
                 </div>

            </div>
        </div>
    );
};

export default About;
