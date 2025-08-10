import React, { useState, useEffect } from "react";
import "./createStory.css";

const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [narrative, setNarrative] = useState("");
  const [message, setMessage] = useState("");
  const [stories, setStories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/userstories");
      if (!res.ok) throw new Error("Failed to fetch stories");
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error("Error fetching stories:", err);
      setMessage("Error loading stories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (narrative.length > 3000) {
      setMessage("Story cannot exceed 3000 characters.");
      return;
    }

    if (!title.trim() || !author.trim() || !narrative.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    const storyData = { title, author, narrative };

    try {
      let url = "http://localhost:8080/api/userstories";
      let method = "POST";

      if (editId) {
        url = `${url}/${editId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      setMessage(editId ? "Story updated successfully!" : "Story created successfully!");
      setTitle("");
      setAuthor("");
      setNarrative("");
      setEditId(null);
      fetchStories();
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("There was a problem submitting your story.");
    }
  };

  const handleEdit = (story) => {
    setTitle(story.title);
    setAuthor(story.author);
    setNarrative(story.narrative);
    setEditId(story.storyId);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/userstories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMessage("Story deleted.");
      fetchStories();
      if (expandedId === id) setExpandedId(null);
      if (editId === id) {
        setEditId(null);
        setTitle("");
        setAuthor("");
        setNarrative("");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to delete the story.");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="story-container">
      <h2>{editId ? "Edit Story" : "Create Your Own Story"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
          placeholder="Story Title"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={50}
          required
          placeholder="Author Name"
        />
        <textarea
          value={narrative}
          onChange={(e) => setNarrative(e.target.value)}
          maxLength={3000}
          required
          placeholder="Write your story here..."
        />
        <button type="submit">{editId ? "Update Story" : "Submit Story"}</button>
        {message && <p>{message}</p>}
      </form>

      <h3>📚 My Created Stories</h3>
      {stories.length === 0 ? (
        <p>No stories yet. Start writing one!</p>
      ) : (
        <ul className="story-list">
          {stories.map((story) => (
            <li key={story.storyId} className="story-item">
              <strong>{story.title}</strong> by {story.author}
              <br />
              <em>{story.publishedDt}</em>

              <div style={{ marginTop: "0.5rem" }}>
                <span
                  className="read-story-text"
                  onClick={() => toggleExpand(story.storyId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") toggleExpand(story.storyId);
                  }}
                >
                  {expandedId === story.storyId ? "Hide Story" : "Read Story"}
                </span>
              </div>

              <div className="story-actions" style={{ marginTop: "1rem" }}>
                <button onClick={() => handleEdit(story)}>Edit</button>
                <button onClick={() => handleDelete(story.storyId)}>Delete</button>
              </div>

              {expandedId === story.storyId && (
                <p className="story-narrative">{story.narrative}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreateStory;
