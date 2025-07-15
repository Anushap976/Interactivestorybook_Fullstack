import './StoryBook.css';

const StoryPreview = ({ story, onClick }) => {
  return (
    // Container div for each story preview; click triggers onClick passed as prop
    <div className="story-list-item" onClick={onClick}>
      {/* Display story title ,author*/}
      <h3>{story.title}</h3>
      <p className="author">by {story.author}</p>
      {/* Show a short summary by slicing first 150 characters of story content */}
      <p className="summary">{story.content.substring(0, 150)}...</p>
    </div>
  );
};

export default StoryPreview;