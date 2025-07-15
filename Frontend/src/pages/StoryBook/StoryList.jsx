import StoryPreview from './StoryPreview';

const StoryList = ({ stories, onSelect }) => (
    // Main container for the list of stories
    <section className="story-list fade-in" aria-label="Interactive Story Explorer">
        <h2>📖 Interactive Story Explorer</h2>
        {/* Render each story preview and handle selection */}
        {stories.map((story, index) => (
            <StoryPreview
                key={story.id}
                story={story}
                onClick={() => onSelect(story.id)}
            />
        ))}
    </section>
);

export default StoryList;
