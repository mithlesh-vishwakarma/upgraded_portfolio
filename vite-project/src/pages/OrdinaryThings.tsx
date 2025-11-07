import { useState, useEffect } from 'react';
import Magnet from '../components/Magnet';

const OrdinaryThings = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample art data - replace with your actual artworks
  // const artworks = [
  //   {
  //     id: 1,
  //     title: 'Urban Sketches',
  //     category: 'sketches',
  //     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  //     description: 'Pen and ink sketches of city life',
  //     medium: 'Pen & Ink',
  //     year: '2024'
  //   },
  //   {
  //     id: 2,
  //     title: 'Digital Portrait',
  //     category: 'digital',
  //     image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=800&fit=crop',
  //     description: 'Digital art portrait with vibrant colors',
  //     medium: 'Digital',
  //     year: '2024'
  //   },
  //   {
  //     id: 3,
  //     title: 'Nature Study',
  //     category: 'paintings',
  //     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  //     description: 'Watercolor study of natural forms',
  //     medium: 'Watercolor',
  //     year: '2023'
  //   },
  //   {
  //     id: 4,
  //     title: 'Character Design',
  //     category: 'sketches',
  //     image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=800&fit=crop',
  //     description: 'Original character concept art',
  //     medium: 'Pencil',
  //     year: '2024'
  //   },
  //   {
  //     id: 5,
  //     title: 'Abstract Expression',
  //     category: 'paintings',
  //     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  //     description: 'Abstract acrylic painting',
  //     medium: 'Acrylic',
  //     year: '2023'
  //   },
  //   {
  //     id: 6,
  //     title: 'Digital Landscape',
  //     category: 'digital',
  //     image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=800&fit=crop',
  //     description: 'Surreal digital landscape',
  //     medium: 'Digital',
  //     year: '2024'
  //   }
  // ];

  const categories = [
    { id: 'all', name: 'All Artworks', icon: '🎨' },
    { id: 'sketches', name: 'Sketches', icon: '✏️' },
    { id: 'paintings', name: 'Paintings', icon: '🖌️' },
    { id: 'digital', name: 'Digital Art', icon: '💻' }
  ];

  // const filteredArtworks = selectedCategory === 'all'
  //   ? artworks
  //   : artworks.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen  text-white font-roboto">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            Arts of Ordinary Coder
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-6 md:mb-8 text-center max-w-full">
            "A creative pencil artist with a deep passion for sketching realistic portraits and expressive art. Blending imagination and precision to bring life to every stroke with elegance and emotion."
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-[0_0_15px_#6b5815,0_0_30px_#6b5815]">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-lg scale-105'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5 hover:scale-105'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {/* <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl min-h-[600px]"> */}
          {/* Artworks Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            {/* {filteredArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150 + 600}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 flex flex-col h-full"> */}
                  {/* Image Container */}
                  {/* <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     */}
                    {/* Overlay Content */}
                    {/* <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="inline-block px-3 py-1 bg-yellow-500 text-slate-900 text-xs font-medium rounded-full mb-2">
                            {artwork.medium}
                          </span>
                          <p className="text-gray-300 text-sm">
                            {artwork.description}
                          </p>
                        </div>
                        <span className="text-yellow-500 font-medium text-sm">
                          {artwork.year}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* Card Content */}
                  {/* <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {artwork.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm capitalize">
                        {artwork.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                        <span className="text-yellow-500 group-hover:text-slate-900 text-sm">→</span>
                      </div>
                    </div> */}

                    {/* Animated underline effect */}
                    {/* <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Empty State */}
          {/* {filteredArtworks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-300">No artworks found</h3>
              <p className="text-gray-400">Try selecting a different category.</p>
            </div>
          )}
        </div> */}

        {/* Footer Section */}
       <div className={`text-center mt-20 py-12 border-t border-slate-800 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <h3 className="text-2xl font-bold mb-4 text-yellow-500">
    Interested in a Commissioned Artwork?
  </h3>
  <p className="text-gray-300 mb-6 max-w-xl mx-auto">
    I specialize in creating personalized pencil sketches that capture emotions and details beautifully. 
    Whether it’s a portrait, couple sketch, or a unique concept, I’d love to bring your ideas to life. 
    Your vision, my art.
  </p>
    <Magnet padding={100} disabled={false} magnetStrength={20}>
  <a href="/contact">
    <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-medium rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
      Let's Create Together
    </button>
  </a>
  </Magnet>
</div>

      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
    </div>
  );
};

export default OrdinaryThings;