import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import StoryNarration from './StoryNarration';
import StoryComments from './StoryComments';

const StoryDetail = ({ story, onBack, onNext, onPrev }) => {
  // Reference for the scrollable story content container
  const scrollRef = useRef(null);

  // Keep the logged-in user's id (used to attribute comments correctly)
  const [authUserId, setAuthUserId] = useState(null);

  // Scroll to top when story changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Scroll to top of the story content
    }
  }, [story.id]);

  // Read user info from localStorage and capture userId
  useEffect(() => {
    try {
      // Preferred: authUser (we suggested saving this on login)
      const rawAuth = localStorage.getItem('authUser');
      const auth = rawAuth ? JSON.parse(rawAuth) : null;

      // Fallback: some projects only save { email } in "user"
      const rawUser = localStorage.getItem('user');
      const fallback = rawUser ? JSON.parse(rawUser) : null;

      // If your login stores userId in authUser, grab it here
      const id =
        (auth && typeof auth.userId === 'number' ? auth.userId : null) ??
        (auth && typeof auth.userId === 'string' ? Number(auth.userId) : null) ??
        null;

      setAuthUserId(Number.isFinite(id) ? id : null);

      // OPTIONAL: if you *must* resolve userId by email, do it here by calling a backend endpoint
      // (uncomment and implement if you have /api/users/by-email or similar)
      // if (!id && (auth?.username || fallback?.email)) {
      //   resolveUserIdByEmail(auth?.username || fallback?.email).then((resolved) => {
      //     if (resolved) setAuthUserId(resolved);
      //   }).catch(() => {});
      // }
    } catch {
      setAuthUserId(null);
    }
  }, []);

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
        <StoryComments
          storyId={story.id}        // static JSON id -> used as storyExternalId under the hood
          storyTitle={story.title}  // fallback filter/lookup by title
          userId={authUserId}       // <-- IMPORTANT: ensures comment is saved under the correct user
        />
      </section>
    </div>
  );
};

export default StoryDetail;

// OPTIONAL helper if you have a backend endpoint to resolve userId by email
// async function resolveUserIdByEmail(email) {
//   const API_BASE = 'http://localhost:8080';
//   // Try one of your available endpoints (adjust as per your backend):
//   // const res = await fetch(`${API_BASE}/api/users/by-email?email=${encodeURIComponent(email)}`);
//   // if (!res.ok) return null;
//   // const data = await res.json(); // expect { userId: 4, ... }
//   // return data?.userId ?? null;
//   return null;
// }
