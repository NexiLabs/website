import { useState } from "react";
import { supabase } from "./supabase";

const products = [
  {
    name: "ForgeOS",
    tag: "Community Operating System",
    status: "First MVP",
    desc: "A command center for launching and managing online communities, clubs, teams, and creator groups.",
    features: ["Community profiles", "Roles & permissions", "Applications", "Announcements"],
  },
  {
    name: "PulseDesk",
    tag: "Support & Safety Hub",
    status: "Planned",
    desc: "A clean support desk for handling tickets, reports, appeals, safety cases, and team workflows.",
    features: ["Ticket inbox", "Case notes", "Priority levels", "Status tracking"],
  },
  {
    name: "LumaBuild",
    tag: "Website & Brand Builder",
    status: "Planned",
    desc: "A simple builder for creating polished landing pages, brand pages, and creator websites quickly.",
    features: ["Page templates", "Brand kits", "Contact forms", "SEO basics"],
  },
  {
    name: "OrbitChat",
    tag: "Communication Platform",
    status: "Concept",
    desc: "A lightweight communication platform built for groups, creators, student teams, and communities.",
    features: ["Spaces", "Channels", "Direct messages", "Moderation tools"],
  },
  {
    name: "ArcadeCloud",
    tag: "Social Gaming Network",
    status: "Concept",
    desc: "A social gaming platform where users can create rooms, mini-games, profiles, and creator-led experiences.",
    features: ["Rooms", "Mini-games", "Profiles", "Creator tools"],
  },
  {
    name: "NovaLearn",
    tag: "Learning Platform",
    status: "Concept",
    desc: "A free learning hub for practical digital skills, coding, business, design, and online safety.",
    features: ["Skill paths", "Lessons", "Projects", "Progress tracking"],
  },
];

const faqs = [
  {
    q: "Is Nexi Labs free?",
    a: "Yes. Nexi Labs is launching as a free-first company. Core tools are planned to be free during the early access and beta phases.",
  },
  {
    q: "What product is being built first?",
    a: "ForgeOS is the first planned MVP because it gives Nexi Labs a strong foundation for communities, teams, roles, applications, and dashboards.",
  },
  {
    q: "Is this a real company website?",
    a: "This is the live foundation for Nexi Labs. It includes a production website, GitHub organization, Supabase database, waitlist, and email notification system.",
  },
  {
    q: "Can I join early access?",
    a: "Yes. Use the waitlist form to register your interest and choose which product you care about most.",
  },
  {
    q: "Will there be paid plans later?",
    a: "Possibly. The goal is to keep essential tools accessible while later adding optional premium features for teams that need advanced automation, analytics, or support.",
  },
];

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", product: "" });
  const [status, setStatus] = useState("");

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleWaitlist(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("waitlist").insert([
      {
        name: form.name,
        email: form.email,
        product: form.product,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("You joined the Nexi Labs launch list.");
    setForm({ name: "", email: "", product: "" });
  }

  return (
    <main className="site">
      <nav className="nav">
        <a className="logo" href="#top">Nexi Labs</a>

        <div className="navLinks">
          <a href="#products">Products</a>
          <a href="#mission">Mission</a>
          <a href="#faq">FAQ</a>
          <a href="#waitlist">Waitlist</a>
          <a className="navButton" href="#waitlist">Start Free</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="orb orbOne"></div>
        <div className="orb orbTwo"></div>

        <p className="eyebrow">Free-first technology company</p>

        <h1>
          Build better tools.
          <br />
          Make them free first.
        </h1>

        <p className="heroText">
          Nexi Labs creates original software for communities, creators,
          students, startups, gamers, and digital teams.
        </p>

        <div className="heroBtns">
          <a className="primary" href="#products">Explore Products</a>
          <a className="secondary" href="#waitlist">Join Waitlist</a>
        </div>
      </section>

      <section className="stats">
        <div><strong>6</strong><span>Original products</span></div>
        <div><strong>£0</strong><span>Launch pricing</span></div>
        <div><strong>Live</strong><span>Production website</span></div>
      </section>

      <section id="products" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Products</p>
          <h2>A new software ecosystem from zero.</h2>
          <p>
            Nexi Labs is building a connected suite of tools for community
            management, support workflows, website creation, communication,
            learning, and social gaming.
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

              <ul className="featureList">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <a className="cardLink" href="#waitlist">Join early access</a>
            </article>
          ))}
        </div>
      </section>

      <section id="mission" className="mission">
        <div>
          <p className="eyebrow">Mission</p>
          <h2>Useful software should help people start.</h2>
          <p>
            Nexi Labs is designed around accessibility. The goal is to give new
            creators, communities, students, and small teams practical software
            they can use before they have funding, large audiences, or full teams.
          </p>
        </div>

        <div className="missionCard">
          <h3>Launch Principles</h3>
          <ul>
            <li>Core tools stay free during early access</li>
            <li>No pay-to-win mechanics</li>
            <li>No exploitative pricing patterns</li>
            <li>Privacy-first product design</li>
            <li>Built for real people starting from zero</li>
          </ul>
        </div>
      </section>

      <section id="roadmap" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Roadmap</p>
          <h2>The build order.</h2>
          <p>
            Nexi Labs starts with the website and waitlist, then moves into the
            first product MVP and shared infrastructure.
          </p>
        </div>

        <div className="timeline">
          <div><b>01</b><p>Launch the Nexi Labs website and waitlist.</p></div>
          <div><b>02</b><p>Build ForgeOS as the first free product MVP.</p></div>
          <div><b>03</b><p>Add product pages, authentication, and dashboard foundations.</p></div>
          <div><b>04</b><p>Develop PulseDesk and LumaBuild as the next tools.</p></div>
          <div><b>05</b><p>Expand into OrbitChat, ArcadeCloud, and NovaLearn concepts.</p></div>
        </div>
      </section>

      <section id="faq" className="section faqSection">
        <div className="sectionHeader">
          <p className="eyebrow">FAQ</p>
          <h2>Questions people may ask.</h2>
        </div>

        <div className="faqGrid">
          {faqs.map((item) => (
            <details className="faqItem" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="waitlist" className="waitlist">
        <p className="eyebrow">Waitlist</p>
        <h2>Join the free launch list.</h2>
        <p>Be first to test Nexi Labs products when early versions go live.</p>

        <form onSubmit={handleWaitlist}>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={updateForm}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={updateForm}
            required
          />

          <select
            name="product"
            value={form.product}
            onChange={updateForm}
            required
          >
            <option value="" disabled>Product I care about most</option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>{product.name}</option>
            ))}
          </select>

          <button type="submit">Join Waitlist</button>
        </form>

        {status && <div className="success">{status}</div>}
      </section>

      <footer className="footer">
        <div className="footerBrand">
          <h2>Nexi Labs</h2>
          <p>
            Original free-first tools for creators, communities, startups,
            students, gamers, and digital teams.
          </p>
          <strong>CommunityShieldOfficial@gmail.com</strong>
        </div>

        <div className="footerCols">
          <div>
            <h4>Company</h4>
            <a href="#mission">Mission</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#faq">FAQ</a>
            <a href="#waitlist">Waitlist</a>
          </div>

          <div>
            <h4>Products</h4>
            {products.slice(0, 4).map((product) => (
              <a key={product.name} href="#products">{product.name}</a>
            ))}
          </div>

          <div>
            <h4>More</h4>
            <a href="https://github.com/NexiLabs" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://nexi-labs.vercel.app" target="_blank" rel="noreferrer">Live Site</a>
            <a href="mailto:CommunityShieldOfficial@gmail.com">Contact</a>
            <a href="#top">Back to top</a>
          </div>
        </div>

        <div className="footerBottom">
          <span>© 2026 Nexi Labs. All rights reserved.</span>
          <span>Build better tools. Make them free first.</span>
        </div>
      </footer>
    </main>
  );
}