import React, { useState, useEffect } from "react";
import "./createStory.css";

const CreateStory = () => {
  // State for form fields and messages
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [narrative, setNarrative] = useState("");
  const [message, setMessage] = useState("");

  // Stories list, editing story ID, and expanded story ID
  const [stories, setStories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Fetch stories when component mounts
  useEffect(() => {
    fetchStories();
  }, []);

  // Fetch all stories from backend API
  const fetchStories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/userstories");
      if (!res.ok) throw new Error("Failed to fetch stories");
      const data = await res.json();
      setStories(data);  // Update stories state
    } catch (err) {
      console.error("Error fetching stories:", err);
      setMessage("Error loading stories.");
    }
  };

  // Handle form submit for creating or updating a story
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
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

      // If editing, update URL and method accordingly
      if (editId) {
        url = `${url}/${editId}`;
        method = "PUT";
      }

      // Send request to backend
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      // Show success message and reset form
      setMessage(editId ? "Story updated successfully!" : "Story created successfully!");
      setTitle("");
      setAuthor("");
      setNarrative("");
      setEditId(null);

      // Refresh stories list
      fetchStories();
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("There was a problem submitting your story.");
    }
  };

  // Load story data into form for editing
  const handleEdit = (story) => {
    setTitle(story.title);
    setAuthor(story.author);
    setNarrative(story.narrative);
    setEditId(story.storyId);
    setMessage("");
  };

  // Delete a story by ID with confirmation prompt
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/userstories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMessage("Story deleted.");

      // Refresh stories list and reset states if necessary
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

  // Toggle showing/hiding full story narrative
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="story-container">
      <h2>{editId ? "Edit Story" : "Create Your Own Story"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Story title input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
          placeholder="Story Title"
        />

        {/* Author name input */}
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={50}
          required
          placeholder="Author Name"
        />

        {/* Story narrative textarea */}
        <textarea
          value={narrative}
          onChange={(e) => setNarrative(e.target.value)}
          maxLength={3000}
          required
          placeholder="Write your story here..."
        />

        {/* Submit button changes text for create or update */}
        <button type="submit">{editId ? "Update Story" : "Submit Story"}</button>

        {/* Show messages */}
        {message && <p>{message}</p>}
      </form>

      <h3>📚 My Created Stories</h3>

      {/* If no stories, prompt to start writing */}
      {stories.length === 0 ? (
        <p>No stories yet. Start writing one!</p>
      ) : (
        <ul className="story-list">
          {stories.map((story) => (
            <li key={story.storyId} className="story-item">
              <strong>{story.title}</strong> by {story.author}
              <br />
              <em>{story.publishedDt}</em>

              {/* Toggle read/hide story narrative */}
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

              {/* Edit and Delete buttons */}
              <div className="story-actions" style={{ marginTop: "1rem" }}>
                <button onClick={() => handleEdit(story)}>Edit</button>
                <button onClick={() => handleDelete(story.storyId)}>Delete</button>
              </div>

              {/* Show full narrative if expanded */}
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
