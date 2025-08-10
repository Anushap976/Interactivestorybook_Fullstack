import React, { useState } from 'react';
import './Feedback.css';
import Button from "../../components/Button";

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Unable to submit feedback right now.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {submitted ? (
        <div className="feedback-success">
          Thank you! Your feedback was submitted.
          <Button text="Submit another" onClick={() => setSubmitted(false)} />
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          {error && <div className="feedback-error">{error}</div>}
          <div className="form-group">
            <label>Name</label>
            <input
              className="feedback-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="feedback-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              className="feedback-textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <Button text="Send Feedback" type="submit" />
        </form>
      )}
    </div>
  );
};

export default Feedback;
