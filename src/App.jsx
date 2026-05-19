import { useState } from "react";

const products = [
  {
    name: "ForgeOS",
    tag: "Community Operating System",
    status: "First MVP",
    desc: "Launch and manage online communities with roles, applications, events, announcements, profiles, and moderation tools.",
  },
  {
    name: "PulseDesk",
    tag: "Support & Safety Hub",
    status: "Planned",
    desc: "Handle tickets, reports, appeals, incidents, and support requests from one clean dashboard.",
  },
  {
    name: "LumaBuild",
    tag: "Website & Brand Builder",
    status: "Planned",
    desc: "Create modern websites for creators, communities, students, startups, and small teams.",
  },
  {
    name: "OrbitChat",
    tag: "Communication Platform",
    status: "Concept",
    desc: "A lightweight messaging platform for groups, creators, clubs, teams, and communities.",
  },
  {
    name: "ArcadeCloud",
    tag: "Social Gaming Network",
    status: "Concept",
    desc: "Create rooms, mini-games, profiles, cosmetics, and social gaming experiences.",
  },
  {
    name: "NovaLearn",
    tag: "Learning Platform",
    status: "Concept",
    desc: "Free learning for coding, business, design, online safety, and digital skills.",
  },
];

export default function App() {
  const [joined, setJoined] = useState(false);

  function handleWaitlist(e) {
    e.preventDefault();
    setJoined(true);
  }

  return (
    <main className="site">
      <nav className="nav">
        <div className="logo">Nexi Labs</div>

        <div className="navLinks">
          <a href="#products">Products</a>
          <a href="#mission">Mission</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#waitlist">Waitlist</a>
          <a className="navButton" href="#waitlist">Start Free</a>
        </div>
      </nav>

      <section className="hero">
        <div className="orb orbOne"></div>
        <div className="orb orbTwo"></div>

        <p className="eyebrow">Free-first technology company</p>

        <h1>
          Build better tools.
          <br />
          Make them free first.
        </h1>

        <p className="heroText">
          Nexi Labs builds original products for communities, creators,
          students, startups, gamers, and digital teams.
        </p>

        <div className="heroBtns">
          <a className="primary" href="#products">Explore Products</a>
          <a className="secondary" href="#waitlist">Join Waitlist</a>
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>6</strong>
          <span>Original products</span>
        </div>
        <div>
          <strong>£0</strong>
          <span>Launch pricing</span>
        </div>
        <div>
          <strong>2026</strong>
          <span>Build phase</span>
        </div>
      </section>

      <section id="products" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Products</p>
          <h2>New tools from zero.</h2>
          <p>
            A fresh ecosystem focused on building, managing, learning,
            communicating, and creating online.
          </p>
        </div>

        <div className="grid">
          {products.map((product) => (
            <article className="card" key={product.name}>
              <div className="cardTop">
                <span>{product.tag}</span>
                <small>{product.status}</small>
              </div>
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <button>Coming Free</button>
            </article>
          ))}
        </div>
      </section>

      <section id="mission" className="mission">
        <div>
          <p className="eyebrow">Mission</p>
          <h2>Useful software should be accessible.</h2>
          <p>
            Nexi Labs starts with free products so new communities, creators,
            students, and small teams can launch without being blocked by cost.
          </p>
        </div>

        <div className="missionCard">
          <h3>Launch Rules</h3>
          <ul>
            <li>Core tools stay free during early access</li>
            <li>No pay-to-win systems</li>
            <li>No exploitative pricing</li>
            <li>Privacy-first product design</li>
            <li>Built for real people starting from zero</li>
          </ul>
        </div>
      </section>

      <section id="roadmap" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Roadmap</p>
          <h2>The build order.</h2>
        </div>

        <div className="timeline">
          <div><b>01</b><p>Launch Nexi Labs website.</p></div>
          <div><b>02</b><p>Build ForgeOS as the first free product.</p></div>
          <div><b>03</b><p>Add PulseDesk for support workflows.</p></div>
          <div><b>04</b><p>Create LumaBuild for free website creation.</p></div>
          <div><b>05</b><p>Open early concepts for OrbitChat, ArcadeCloud, and NovaLearn.</p></div>
        </div>
      </section>

      <section id="waitlist" className="waitlist">
        <p className="eyebrow">Waitlist</p>
        <h2>Join the free launch list.</h2>
        <p>Be first to test Nexi Labs products when early versions go live.</p>

        <form onSubmit={handleWaitlist}>
          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />

          <select required defaultValue="">
            <option value="" disabled>Product I care about most</option>
            <option>ForgeOS</option>
            <option>PulseDesk</option>
            <option>LumaBuild</option>
            <option>OrbitChat</option>
            <option>ArcadeCloud</option>
            <option>NovaLearn</option>
          </select>

          <button type="submit">Join Waitlist</button>
        </form>

        {joined && (
          <div className="success">
            You joined the Nexi Labs launch list.
          </div>
        )}
      </section>

      <footer id="contact">
        <h2>Nexi Labs</h2>
        <p>Original free-first tools for creators, communities, startups, and digital teams.</p>
        <strong>CommunityShieldOfficial@gmail.com</strong>
      </footer>
    </main>
  );
}