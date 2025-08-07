import { useState } from "react";
import "./createStory.css";

const CreateStory = () => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 3000) {
      setMessage("Story cannot exceed 3000 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/userstories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMessage("Story submitted successfully!");
      setContent("");
    } catch (error) {
      setMessage("There was a problem submitting your story.");
    }
  };

  return (
    <div className="story-container">
      <h2>Create Your Own Story</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength="3000"
          required
          placeholder="Write your story here..."
        ></textarea>
        <button type="submit">Submit Story</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CreateStory;
