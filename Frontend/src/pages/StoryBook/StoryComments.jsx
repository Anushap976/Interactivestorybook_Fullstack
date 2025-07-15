import { useState } from 'react';
import Button from '../../components/Button';

const StoryComments = ({ storyId }) => {
    // State to hold all comments keyed by storyId
    const [comments, setComments] = useState({});
    // State to hold the currently typed new comment
    const [newComment, setNewComment] = useState('');

    // Handler to add a new comment to the current story's comment list
    const handleAdd = () => {
        if (!newComment.trim()) return;

        // Create updated comments object with new comment appended
        const updated = {
            ...comments,
            [storyId]: [...(comments[storyId] || []), newComment],
        };
        setComments(updated);
        setNewComment('');
    };

    return (
        <div className="comment-section">
            <h3>💬 Share your thoughts</h3>
            {/* Textarea for new comment input */}
            <textarea
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
            />

             {/* Reusable Button component to post the comment */}
            <Button text="Post Comment" onClick={handleAdd} />
            {/* List existing comments for this story */}
            <div className="comments-list">
                {(comments[storyId] || []).map((comment, i) => (
                    <p key={i} className="comment-item">📝 {comment}</p>
                ))}
            </div>
        </div>
    );
};

export default StoryComments;
