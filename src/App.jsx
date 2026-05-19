import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

const products = [
  "ForgeOS",
  "PulseDesk",
  "LumaBuild",
  "OrbitChat",
  "ArcadeCloud",
  "NovaLearn",
];

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", product: "" });
  const [status, setStatus] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [user, setUser] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  const [adminStatus, setAdminStatus] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState("home");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const filteredWaitlist = useMemo(() => {
    if (filter === "All") return waitlist;
    return waitlist.filter((entry) => entry.product === filter);
  }, [waitlist, filter]);

  const productCounts = useMemo(() => {
    return products.map((product) => ({
      product,
      count: waitlist.filter((entry) => entry.product === product).length,
    }));
  }, [waitlist]);

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
      setAdminStatus("This account is not an admin yet.");
      return;
    }

    setWaitlist(data);
    setAdminStatus(`Loaded ${data.length} entries.`);
  }

  if (page === "privacy") return <LegalPage title="Privacy Policy" setPage={setPage} />;
  if (page === "terms") return <LegalPage title="Terms of Service" setPage={setPage} />;
  if (page === "aup") return <LegalPage title="Acceptable Use Policy" setPage={setPage} />;

  return (
    <main className="site">
      <nav className="nav">
        <button className="logoButton" onClick={() => setPage("home")}>Nexi Labs</button>

        <div className="navLinks">
          <a href="#products">Products</a>
          <a href="#admin">Admin</a>
          <a href="#legal">Legal</a>
          <a href="#waitlist">Waitlist</a>
          <a className="navButton" href="#waitlist">Start Free</a>
        </div>
      </nav>

      <section className="hero">
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
          <a className="secondary" href="#admin">Admin Dashboard</a>
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
          <h2>Product ecosystem.</h2>
          <p>Nexi Labs is building free-first tools for creation, management, support, learning, and online communities.</p>
        </div>

        <div className="grid">
          {products.map((product) => (
            <article className="card" key={product}>
              <div className="cardTop">
                <span>Coming Free</span>
                <small>{product === "ForgeOS" ? "First MVP" : "Planned"}</small>
              </div>
              <h3>{product}</h3>
              <p>
                {product === "ForgeOS" && "A community operating system for managing roles, applications, announcements, and teams."}
                {product === "PulseDesk" && "A support and safety dashboard for tickets, appeals, reports, and internal workflows."}
                {product === "LumaBuild" && "A website and brand builder for creators, students, startups, and small teams."}
                {product === "OrbitChat" && "A lightweight communication platform for communities, clubs, teams, and creators."}
                {product === "ArcadeCloud" && "A social gaming network for rooms, mini-games, profiles, and creator experiences."}
                {product === "NovaLearn" && "A learning platform for coding, online safety, business, design, and digital skills."}
              </p>
              <a className="cardLink" href="#waitlist">Join early access</a>
            </article>
          ))}
        </div>
      </section>

      <section id="auth" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Authentication</p>
          <h2>Sign in or create an account.</h2>
        </div>

        <form className="authBox">
          <input type="email" placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />

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
          <h2>Waitlist intelligence.</h2>
          <p>View signups, product interest, latest leads, and early demand signals.</p>
        </div>

        <div className="adminPanel">
          <button onClick={loadWaitlist}>Load Waitlist</button>
          {adminStatus && <p>{adminStatus}</p>}

          <div className="adminStats">
            <div><strong>{waitlist.length}</strong><span>Total signups</span></div>
            <div><strong>{productCounts[0]?.count ?? 0}</strong><span>ForgeOS interest</span></div>
            <div><strong>{filteredWaitlist.length}</strong><span>Filtered results</span></div>
          </div>

          <div className="filterBar">
            <button onClick={() => setFilter("All")}>All</button>
            {products.map((product) => (
              <button key={product} onClick={() => setFilter(product)}>{product}</button>
            ))}
          </div>

          <div className="adminTable">
            {filteredWaitlist.map((entry) => (
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

      <section id="legal" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Legal</p>
          <h2>Basic legal pages.</h2>
          <p>These pages explain how Nexi Labs handles access, acceptable use, and basic privacy expectations.</p>
        </div>

        <div className="legalCards">
          <button onClick={() => setPage("privacy")}>Privacy Policy</button>
          <button onClick={() => setPage("terms")}>Terms of Service</button>
          <button onClick={() => setPage("aup")}>Acceptable Use Policy</button>
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
              <option key={product} value={product}>{product}</option>
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

        <div className="footerCols">
          <div>
            <h4>Legal</h4>
            <button onClick={() => setPage("privacy")}>Privacy Policy</button>
            <button onClick={() => setPage("terms")}>Terms</button>
            <button onClick={() => setPage("aup")}>Acceptable Use</button>
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

function LegalPage({ title, setPage }) {
  return (
    <main className="site">
      <section className="legalPage">
        <button className="backButton" onClick={() => setPage("home")}>← Back to website</button>
        <p className="eyebrow">Nexi Labs Legal</p>
        <h1>{title}</h1>
        <p><strong>Last updated:</strong> May 2026</p>

        <div className="legalText">
          {title === "Privacy Policy" && (
            <>
              <h2>1. Information We Collect</h2>
              <p>Nexi Labs may collect names, email addresses, product interests, authentication data, and basic technical information submitted through the website.</p>
              <h2>2. How We Use Information</h2>
              <p>We use information to manage the waitlist, contact interested users, improve products, and operate the website safely.</p>
              <h2>3. Data Storage</h2>
              <p>Waitlist and authentication data may be stored using Supabase. Website hosting is handled through Vercel.</p>
              <h2>4. Contact</h2>
              <p>For privacy questions, contact CommunityShieldOfficial@gmail.com.</p>
            </>
          )}

          {title === "Terms of Service" && (
            <>
              <h2>1. Use of the Website</h2>
              <p>By using this website, you agree to use Nexi Labs services responsibly and lawfully.</p>
              <h2>2. Early Access</h2>
              <p>Products may be experimental, incomplete, or changed at any time during early development.</p>
              <h2>3. No Guarantee</h2>
              <p>Nexi Labs is provided as-is during early development with no guarantee of uptime, availability, or final release dates.</p>
              <h2>4. Contact</h2>
              <p>For questions, contact CommunityShieldOfficial@gmail.com.</p>
            </>
          )}

          {title === "Acceptable Use Policy" && (
            <>
              <h2>1. Allowed Use</h2>
              <p>Nexi Labs tools should be used for lawful, ethical, constructive, and community-focused purposes.</p>
              <h2>2. Prohibited Use</h2>
              <p>Users may not use Nexi Labs for harassment, abuse, illegal activity, spam, doxxing, exploitation, or harmful automation.</p>
              <h2>3. Enforcement</h2>
              <p>Nexi Labs may restrict access to users or communities that misuse future services.</p>
              <h2>4. Safety First</h2>
              <p>The platform is designed around accessibility, privacy, and responsible use.</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}