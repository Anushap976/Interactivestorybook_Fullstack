import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';

const API_BASE = 'http://localhost:8080';

const StoryComments = ({ storyId, storyTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      let url;
      if (storyId) {
        url = `${API_BASE}/api/story-reviews?storyId=${encodeURIComponent(storyId)}`;
      } else {
        // Fallback: load all and filter by title on client
        url = `${API_BASE}/api/story-reviews`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const data = await res.json();

      let filtered = Array.isArray(data) ? data : [];
      if (!storyId && storyTitle) {
        filtered = filtered.filter(r =>
          r.story && typeof r.story.title === 'string' &&
          r.story.title.toLowerCase() === storyTitle.toLowerCase()
        );
      }

      setComments(filtered);
    } catch (e) {
      console.error(e);
      setError('Could not load comments.');
    }
  };

  useEffect(() => { if (storyId) load(); }, [storyId]);

  const add = async () => {
    if (!newComment.trim()) return;
    setError('');
    try {
      const payload = {
        comment: newComment.trim(),
        ...(storyId ? { storyId } : {}),
        ...(storyTitle ? { title: storyTitle } : {})
      };

      const res = await fetch(`${API_BASE}/api/story-reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`POST failed: ${res.status} ${txt}`);
      }
      setNewComment('');
      load();
    } catch (e) {
      console.error(e);
      setError('Unable to post comment.');
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      {error && <div className="comments-error">{error}</div>}

      <div className="comment-form">
        <textarea
          className="comment-textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
        />
        <Button text="Post" onClick={add} />
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={(c.id ?? c.reviewId)}>
              <p>{c.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoryComments;
