
import './About.css';
// Importing stories data from local JSON
import stories from '../../assets/stories.json';
import woodenstandbooks from '../../assets/woodenstandbooks.png';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-mission">
        <h3>🎯 Our Mission</h3>
        <p>
          At <strong>Interactive StoryBook</strong>, our mission is simple:
        </p>
        {/* Mission goals listed with icons */}
        <ul>
          <li>✨ Spark imagination through interactive storytelling</li>
          <li>📚 Make reading fun, engaging, and accessible</li>
          <li>📝 Empower users to become creators of their own stories</li>
          <li>🌍 Build a diverse and inclusive space for dreamers everywhere</li>
        </ul>
        <p>
          We believe every story matters — and yours might just be the next great adventure waiting to be told.
        </p>
      </section>

       {/* Mission-related image with alt text for accessibility */}
      <img
        src={woodenstandbooks}
        alt="Colorful Storybook Display"
        className="about-image"
      />

      {/* Section: Popular stories table */}
      <section className="about-stories">
        <h3>📖 Popular Storybooks & Authors</h3>
         {/* Table showing dynamic storybook list from JSON */}
        <table className="story-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {stories.map(({ id, title, author }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{author}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="coming-soon">🚀 More stories coming soon...</p>
        <p className="about-quote">
          "The stories we tell shape the world we live in. Start yours today. 🌟"
        </p>
      </section>

    </div>
  );
}

export default About;