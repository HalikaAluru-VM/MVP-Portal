import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardButton from '../components/CardButton';
import { chatbotTemplates, cardRoutes } from '../data';
import bg from '../../public/bg.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [filteredCards, setFilteredCards] = React.useState(chatbotTemplates);
  const [noResults, setNoResults] = React.useState(false);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    const searchLower = search.trim().toLowerCase();
    // Check for month in search
    const months = [
      'january','february','march','april','may','june','july','august','september','october','november','december'
    ];
    const foundMonth = months.find(m => searchLower.includes(m));
    // Match search to card title (allow partial, fuzzy, and plural matches)
    let foundIdx = -1;
    const filtered = chatbotTemplates.filter((card, idx) => {
      const titleLower = card.title.toLowerCase();
      if (
        searchLower === titleLower ||
        searchLower.includes(titleLower) ||
        titleLower.includes(searchLower) ||
        searchLower.replace(/s$/,'') === titleLower.replace(/s$/,'')
      ) {
        foundIdx = idx;
        return true;
      }
      return false;
    });
    setFilteredCards(filtered.length > 0 ? filtered : []);
    setNoResults(filtered.length === 0);
    if (foundIdx !== -1) {
      // If month is found and card is Events, pass as query param
      if (foundMonth && chatbotTemplates[foundIdx].title.toLowerCase() === 'events') {
        navigate(`/upcoming-events?month=${foundMonth}`);
      } else {
        navigate(cardRoutes[foundIdx]);
      }
    } else if (foundMonth) {
      // If only month is found, go to events page with month
      navigate(`/upcoming-events?month=${foundMonth}`);
    }
  };

  // Update filtered cards as user types
  React.useEffect(() => {
    if (!search.trim()) {
      setFilteredCards(chatbotTemplates);
      setNoResults(false);
      return;
    }
    const searchLower = search.trim().toLowerCase();
    const filtered = chatbotTemplates.filter(card => {
      const titleLower = card.title.toLowerCase();
      return (
        searchLower === titleLower ||
        searchLower.includes(titleLower) ||
        titleLower.includes(searchLower) ||
        searchLower.replace(/s$/,'') === titleLower.replace(/s$/,'')
      );
    });
    setFilteredCards(filtered.length > 0 ? filtered : []);
    setNoResults(filtered.length === 0);
  }, [search]);

  // Handle card button click
  const handleCardClick = (idx) => {
    if (cardRoutes[idx]) navigate(cardRoutes[idx]);
  };

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="fixed inset-0 -z-10 w-full h-full bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="min-h-screen h-screen relative flex flex-col justify-center items-center">
      
        <div className="relative z-10 flex flex-col items-center w-full px-2 h-full justify-center">
          {/* Header Section */}
          <div className="w-full max-w-2xl flex flex-col justify-center mb-2 pl-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-1" style={{letterSpacing:'-1px'}}>
              Hello Sreehitha!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
              What's on <span className="text-[#00CFFF]">your mind?</span>
            </h2>
          </div>
          <div className="w-full max-w-2xl mb-6 flex justify-center">
            <form className="relative w-full" style={{maxWidth: '600px'}} onSubmit={handleSearch}>
              <div className="bg-black-400 border border-gray-700 rounded-2xl p-3 flex flex-col" style={{boxShadow:'0 0 0 1px #232B39',}}>
                {/* Sub-box for textarea */}
                  <div
                  className="bg-gray-950 border border-gray-500 rounded-xl p-3 mb-2"
                  style={{
                    boxShadow: '0 0 0 1px #232B39',
                    minHeight: '90px',
                    height: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <textarea 
                    placeholder="Ask your question or make a request..."
                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none px-2 py-1 text-base min-h-[70px] rounded-xl"
                    rows="5"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-between w-full pt-1">
                  <button type="button" className="flex items-center space-x-2 text-white bg-gray-950 border border-gray-700 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-950 transition-colors duration-200">
                    <svg className="w-4 h-4 mr-2 rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>Attach</span>
                  </button>
                  <button type="submit" className="bg-gray-950 hover:bg-[#232B39] text-white rounded-xl px-2 py-1 transition-colors duration-200 flex items-center justify-center" style={{boxShadow:'0 0 0 1px #232B39'}}>
                    <svg className="w-5 h-5 rotate-45" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Card Grid */}
          <div>
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-3">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => {
                    // Find the index in the original array for navigation
                    const originalIdx = chatbotTemplates.findIndex(c => c.title === card.title);
                    return (
                      <CardButton
                        key={originalIdx}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                        onClick={() => handleCardClick(originalIdx)}
                      />
                    );
                  })
                ) : (
                  noResults && (
                    <div className="col-span-3 text-center text-gray-400 py-8">No results found.</div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;