
import React from 'react';

const images = [
    { src: 'https://picsum.photos/600/400?random=21', alt: 'Elegant main course' },
    { src: 'https://picsum.photos/400/600?random=22', alt: 'Artisanal cocktail' },
    { src: 'https://picsum.photos/600/400?random=23', alt: 'Restaurant ambient lighting' },
    { src: 'https://picsum.photos/600/400?random=24', alt: 'Decadent dessert' },
    { src: 'https://picsum.photos/600/400?random=25', alt: 'Guests dining' },
    { src: 'https://picsum.photos/400/600?random=26', alt: 'Chef plating a dish' },
    { src: 'https://picsum.photos/600/400?random=27', alt: 'Close up of an appetizer' },
    { src: 'https://picsum.photos/600/400?random=28', alt: 'The bar area' },
];

const GalleryImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
    <div className="overflow-hidden rounded-lg shadow-xl group">
        <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
        />
    </div>
);

const Gallery: React.FC = () => {
    return (
        <div className="py-20 bg-brand-gray">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-serif font-bold text-center text-brand-gold mb-4">Visual Symphony</h1>
                <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">A glimpse into the world of The Gilded Spoon, where every detail is a piece of art.</p>
                
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {images.map((image, index) => (
                        <GalleryImage key={index} src={image.src} alt={image.alt} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
