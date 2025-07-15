import { useState } from 'react';
import './Feedback.css'
import Button from "../../components/Button";

const Feedback = () => {
    // State to store input values from the form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    // State to track whether feedback was submitted
    const [submitted, setSubmitted] = useState(false);

    // Update formData state as user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();       // Prevent page reload
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    }

    return (
        <div className="feedback-page-background">
            <div className='feedback-container'>
                {!submitted && <h2>We would love your feedback!</h2>}
                {/* Conditional rendering: thank-you message or form */}
                {submitted ? (
                    <p className="feedback-success">Thank you for your feedback! ✨</p>
                ) : (
                    <form className="feedback-form" onSubmit={handleSubmit}>
                        {/* Name input */}
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </label>

                        {/* Email input */}
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </label>

                        {/* Message textarea */}
                        <label>
                            Message:
                            <textarea
                                name="message"
                                value={formData.message}
                                rows="8"
                                onChange={handleChange}
                                placeholder="Share your thoughts with us..."
                                required
                            />
                        </label>

                        {/* Submit using reusable button component */}
                        <Button text="Send feedback" type="submit" />
                    </form>
                )}
            </div>
        </div>
    )
}
export default Feedback;