import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const products = [
  {
    slug: "forgeos",
    name: "ForgeOS",
    tag: "Community Operating System",
    status: "First MVP",
    desc: "A command center for launching and managing online communities, clubs, teams, and creator groups.",
    details:
      "ForgeOS is the first flagship Nexi Labs product. It helps people create community spaces, manage members, handle roles, collect applications, post announcements, and run teams from one clean dashboard.",
    features: ["Community profiles", "Roles & permissions", "Applications", "Announcements", "Member dashboards", "Staff tools"],
  },
  {
    slug: "pulsedesk",
    name: "PulseDesk",
    tag: "Support & Safety Hub",
    status: "Planned",
    desc: "A clean support desk for handling tickets, reports, appeals, safety cases, and team workflows.",
    details:
      "PulseDesk is built for communities and teams that need structured support workflows. It helps handle incidents, appeals, reports, internal notes, and case tracking.",
    features: ["Ticket inbox", "Case notes", "Priority levels", "Status tracking", "Appeals", "Safety workflows"],
  },
  {
    slug: "lumabuild",
    name: "LumaBuild",
    tag: "Website & Brand Builder",
    status: "Planned",
    desc: "A simple builder for creating polished landing pages, brand pages, and creator websites quickly.",
    details:
      "LumaBuild gives creators, students, communities, and startups a fast way to create modern websites without needing to code everything from scratch.",
    features: ["Page templates", "Brand kits", "Contact forms", "SEO basics", "Landing pages", "Creator pages"],
  },
  {
    slug: "orbitchat",
    name: "OrbitChat",
    tag: "Communication Platform",
    status: "Concept",
    desc: "A lightweight communication platform built for groups, creators, student teams, and communities.",
    details:
      "OrbitChat is a communication platform concept designed for small communities, groups, clubs, and creators who want focused spaces without unnecessary complexity.",
    features: ["Spaces", "Channels", "Direct messages", "Moderation tools", "Profiles", "Notifications"],
  },
  {
    slug: "arcadecloud",
    name: "ArcadeCloud",
    tag: "Social Gaming Network",
    status: "Concept",
    desc: "A social gaming platform where users can create rooms, mini-games, profiles, and creator-led experiences.",
    details:
      "ArcadeCloud is the long-term social gaming branch of Nexi Labs, focused on creator-made spaces, mini-games, profile customization, and social play.",
    features: ["Rooms", "Mini-games", "Profiles", "Creator tools", "Cosmetics", "Events"],
  },
  {
    slug: "novalearn",
    name: "NovaLearn",
    tag: "Learning Platform",
    status: "Concept",
    desc: "A free learning hub for practical digital skills, coding, business, design, and online safety.",
    details:
      "NovaLearn is a practical learning platform for people who want to build real digital skills, including coding, design, business basics, online safety, and product development.",
    features: ["Skill paths", "Lessons", "Projects", "Progress tracking", "Guides", "Resources"],
  },
];

const faqs = [
  ["Is Nexi Labs free?", "Yes. Nexi Labs is launching as a free-first company. Core products are planned to remain free during early access."],
  ["What is being built first?", "ForgeOS is the first planned MVP because it gives Nexi Labs a strong foundation for communities and dashboards."],
  ["Is the website live 24/7?", "Yes. The site runs on Vercel, so it stays online even when your laptop is off."],
  ["Does the waitlist work?", "Yes. Submissions are saved to Supabase and trigger email notifications through Resend."],
];

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", product: "" });
  const [status, setStatus] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [user, setUser] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  const [adminStatus, setAdminStatus] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

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

  async function signUp(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
    });

    if (error) return alert(error.message);
    alert("Account created. Check your email if confirmation is required.");
  }

  async function signIn(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });

    if (error) return alert(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setWaitlist([]);
  }

  async function loadWaitlist() {
    setAdminStatus("Loading waitlist...");

    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setAdminStatus("You are signed in, but this account is not an admin yet.");
      return;
    }

    setWaitlist(data);
    setAdminStatus(`Loaded ${data.length} waitlist entries.`);
  }

  return (
    <main className="site">
      <nav className="nav">
        <a className="logo" href="#top">Nexi Labs</a>

        <div className="navLinks">
          <a href="#products">Products</a>
          <a href="#infrastructure">Vercel</a>
          <a href="#auth">Auth</a>
          <a href="#admin">Admin</a>
          <a className="navButton" href="#waitlist">Start Free</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="orb orbOne"></div>
        <div className="orb orbTwo"></div>

        <p className="eyebrow">Free-first technology company</p>
        <h1>Build better tools.<br />Make them free first.</h1>

        <p className="heroText">
          Nexi Labs creates original software for communities, creators,
          students, startups, gamers, and digital teams.
        </p>

        <div className="heroBtns">
          <a className="primary" href="#products">Explore Products</a>
          <a className="secondary" href="#auth">Sign In</a>
        </div>
      </section>

      <section className="stats">
        <div><strong>6</strong><span>Original products</span></div>
        <div><strong>£0</strong><span>Launch pricing</span></div>
        <div><strong>Live</strong><span>Vercel deployment</span></div>
      </section>

      <section id="products" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Products</p>
          <h2>A new software ecosystem from zero.</h2>
          <p>
            Nexi Labs is building connected tools for communities, support,
            websites, communication, learning, and social gaming.
          </p>
        </div>

        <div className="grid">
          {products.map((product) => (
            <article className="card" id={`product-${product.slug}`} key={product.name}>
              <div className="cardTop">
                <span>{product.tag}</span>
                <small>{product.status}</small>
              </div>

              <h3>{product.name}</h3>
              <p>{product.desc}</p>

              <ul className="featureList">
                {product.features.slice(0, 4).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <a className="cardLink" href={`#details-${product.slug}`}>View details</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Product Details</p>
          <h2>What each product will become.</h2>
        </div>

        <div className="detailsGrid">
          {products.map((product) => (
            <article className="detailPanel" id={`details-${product.slug}`} key={product.slug}>
              <small>{product.tag}</small>
              <h3>{product.name}</h3>
              <p>{product.details}</p>

              <div className="pillList">
                {product.features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="infrastructure" className="mission">
        <div>
          <p className="eyebrow">Vercel Deployment</p>
          <h2>Hosted 24/7 without your laptop.</h2>
          <p>
            Nexi Labs is deployed on Vercel. Every time code is pushed to GitHub,
            Vercel automatically builds and publishes the newest version of the website.
          </p>
        </div>

        <div className="missionCard">
          <h3>Production Stack</h3>
          <ul>
            <li>GitHub for source control</li>
            <li>Vercel for hosting and deployments</li>
            <li>Supabase for database and authentication</li>
            <li>Resend for email notifications</li>
            <li>React + Vite frontend</li>
          </ul>
        </div>
      </section>

      <section id="auth" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Authentication</p>
          <h2>Sign up or log in.</h2>
          <p>
            Authentication is powered by Supabase. Admin access is controlled
            separately through the admin user table.
          </p>
        </div>

        <form className="authBox">
          <input
            type="email"
            placeholder="Email"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
          />

          <div className="authBtns">
            <button onClick={signIn}>Sign In</button>
            <button onClick={signUp}>Create Account</button>
            {user && <button type="button" onClick={signOut}>Sign Out</button>}
          </div>

          {user && <p className="success">Signed in as {user.email}</p>}
        </form>
      </section>

      <section id="admin" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Admin Dashboard</p>
          <h2>View waitlist signups.</h2>
          <p>
            Sign in with your admin account, then load the waitlist data from Supabase.
          </p>
        </div>

        <div className="adminPanel">
          <button onClick={loadWaitlist}>Load Waitlist</button>
          {adminStatus && <p>{adminStatus}</p>}

          <div className="adminTable">
            {waitlist.map((entry) => (
              <div className="adminRow" key={entry.id}>
                <strong>{entry.name}</strong>
                <span>{entry.email}</span>
                <span>{entry.product}</span>
                <small>{new Date(entry.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="mission">
        <div>
          <p className="eyebrow">Mission</p>
          <h2>Useful software should help people start.</h2>
          <p>
            Nexi Labs is designed around accessibility. The goal is to give new
            creators, communities, students, and small teams practical software
            they can use before they have funding or large audiences.
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

      <section id="faq" className="section faqSection">
        <div className="sectionHeader">
          <p className="eyebrow">FAQ</p>
          <h2>Questions people may ask.</h2>
        </div>

        <div className="faqGrid">
          {faqs.map(([q, a]) => (
            <details className="faqItem" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="waitlist" className="waitlist">
        <p className="eyebrow">Waitlist</p>
        <h2>Join the free launch list.</h2>
        <p>Be first to test Nexi Labs products when early versions go live.</p>

        <form onSubmit={handleWaitlist}>
          <input name="name" type="text" placeholder="Your name" value={form.name} onChange={updateForm} required />
          <input name="email" type="email" placeholder="Your email" value={form.email} onChange={updateForm} required />

          <select name="product" value={form.product} onChange={updateForm} required>
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
          <p>Original free-first tools for creators, communities, startups, students, gamers, and digital teams.</p>
          <strong>CommunityShieldOfficial@gmail.com</strong>
        </div>

        <div className="footerBottom">
          <span>© 2026 Nexi Labs. All rights reserved.</span>
          <span>Build better tools. Make them free first.</span>
        </div>
      </footer>
    </main>
  );
}