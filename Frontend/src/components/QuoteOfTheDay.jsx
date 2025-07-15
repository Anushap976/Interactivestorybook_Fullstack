import { useEffect, useState } from 'react';

const QuoteOfTheDay = () => {
    // State to store the fetched quote text
    const [quote, setQuote] = useState('');
    // State to store the author of the quote
    const [author, setAuthor] = useState('');
    // State to handle error messages for display
    const [errorMessage, setErrorMessage] = useState('');
    // State to show loading indicator during fetch
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch a quote from external API
    const fetchQuote = () => {
        setIsLoading(true);
        setErrorMessage('');

        fetch('https://quotes-api-self.vercel.app/quote')
            .then((res) => {
                if (!res.ok) {
                    // Manually handle non-200 responses
                    throw new Error('Failed to fetch quote');
                }
                return res.json();
            })
            .then((data) => {
                // Update state with fetched quote and author
                setQuote(data.quote);
                setAuthor(data.author);
            })
            .catch(() => {
                // On failure, show a fallback quote and message
                setQuote('Keep going. Everything you need will come to you.');
                setAuthor('Unknown');
                setErrorMessage("Could not load today's quote. Showing a fallback.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Run fetchQuote() once when the component mounts
    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <section className="quote-section" aria-live="polite">
            {/* Show loading indicator while quote is being fetched */}
            {isLoading && <p>Loading quote...</p>}

            {/* Show quote content after loading is complete */}
            {!isLoading && (
                <>
                    {/* If there was an error, show the message */}
                    {errorMessage && (
                        <p className="error-message" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    {/* Display the quote and optional author */}
                    <blockquote>
                        ✨ "{quote}" {author && <cite>— {author}</cite>}
                    </blockquote>

                </>
            )}
        </section>
    );
};

export default QuoteOfTheDay;
