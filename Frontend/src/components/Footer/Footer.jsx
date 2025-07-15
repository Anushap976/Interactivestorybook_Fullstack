import './Footer.css';

// Functional React component for the website footer
const Footer = () => {
    return (
        <footer className="storybook-footer">
            {/* Current year updates automatically */}
            <p>🪄 © {new Date().getFullYear()} Interactive StoryBook</p>
            <p>Built for dreamers, thinkers, and storytellers of all kinds 💫</p>
            <p>Thanks for reading! Come back soon — the next chapter awaits... 📖✨</p>
        </footer>
    )
}

export default Footer;