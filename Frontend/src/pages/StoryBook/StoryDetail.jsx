import { useEffect, useRef } from 'react';
import Button from '../../components/Button';
import StoryNarration from './StoryNarration';
import StoryComments from './StoryComments';

const StoryDetail = ({ story, onBack, onNext, onPrev }) => {
// Reference for the scrollable story content container
const scrollRef = useRef(null);

// Scroll to top when story changes
useEffect(() => {
if (scrollRef.current) {
scrollRef.current.scrollTop = 0; // Scroll to top of the story content
}
}, [story.id]);

return (
<div className="story-detail fade-in">
{/* Story title and author section */}
<section aria-label="Story header">
<h2>{story.title}</h2>
<p className="author">by {story.author}</p>
</section>

{/* Scrollable story content section */}
<section className="story-scroll-box" ref={scrollRef} aria-label="Story content">
<img src={story.image} alt={story.title} className="story-image" />
<div className="story-text">{story.content}</div>
</section>

{/* Story narration section */}
<section aria-label="Story narration">
<StoryNarration text={story.content} />
</section>

{/* Navigation buttons section */}
<section className="nav-buttons" aria-label="Story navigation">
<Button text="← Previous" onClick={onPrev} />
<Button text="🔄 Back to Library" onClick={onBack} />
<Button text="Next →" onClick={onNext} />
</section>

{/* Comments section */}
<section aria-label="Story comments">
<StoryComments storyId={story.id} />
</section>
</div>
);
};

export default StoryDetail;