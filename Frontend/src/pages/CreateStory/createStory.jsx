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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Your Own Story</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength="3000"
          required
          className="w-full border rounded p-3"
          rows="10"
          placeholder="Write your story here..."
        ></textarea>
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit Story
        </button>
        {message && <p className="mt-3 text-blue-700">{message}</p>}
      </form>
    </div>
  );
};

export default CreateStory;
