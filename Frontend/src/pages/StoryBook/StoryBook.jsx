import { useState, useEffect } from 'react';
import stories from '../../assets/stories.json';
import StoryList from './StoryList';
import StoryDetail from './StoryDetail';
import { useLocation } from 'react-router-dom';


const StoryBook = () => {
  // Tracks the currently selected story index
  const [currentIndex, setCurrentIndex] = useState(null);
    const location = useLocation();
    // New effect to reset currentIndex when the URL changes to /storybook
      useEffect(() => {
        if (location.pathname === '/storybook') {
          setCurrentIndex(null);
        }
      }, [location]);

  // Automatically scroll to top when switching to detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);


  return (
    <div className="storybook-container">
       {/* Conditional rendering: show list or detail based on currentIndex */}
      {currentIndex === null ? (
        // List view: show all stories
        <StoryList stories={stories} onSelect={setCurrentIndex} />
      ) : (
         // Detail view: show selected story and navigation controls
        <StoryDetail
          story={stories[currentIndex]}
          onBack={() => setCurrentIndex(null)}    // Return to list view
          onNext={() => setCurrentIndex(i => (i < stories.length - 1 ? i + 1 : 0))}  //next story
          onPrev={() => setCurrentIndex(i => (i > 0 ? i - 1 : stories.length - 1))}  // previous story]
        />
      )}
    </div>
  );
};

export default StoryBook;
