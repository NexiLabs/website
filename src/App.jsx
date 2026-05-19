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

const legalPages = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  aup: "Acceptable Use Policy",
  cookies: "Cookie Policy",
  disclaimer: "Disclaimer",
  data: "Data Rights Request",
};

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

  const forgeCount = waitlist.filter((entry) => entry.product === "ForgeOS").length;

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

  if (page !== "home") {
    return <LegalPage page={page} title={legalPages[page]} setPage={setPage} />;
  }

  return (
    <main className="site">
      <nav className="nav">
        <button className="logoButton" onClick={() => setPage("home")}>
          Nexi Labs
        </button>

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
          <p>
            Nexi Labs is building free-first tools for creation, management,
            support, learning, communication, and online communities.
          </p>
        </div>

        <div className="grid">
          {products.map((product) => (
            <article className="card" key={product}>
              <div className="cardTop">
                <span>Coming Free</span>
                <small>{product === "ForgeOS" ? "First MVP" : "Planned"}</small>
              </div>
              <h3>{product}</h3>
              <p>{getProductDescription(product)}</p>
              <a className="cardLink" href="#waitlist">Join early access</a>
            </article>
          ))}
        </div>
      </section>

      <section id="auth" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Authentication</p>
          <h2>Sign in or create an account.</h2>
          <p>
            Authentication is powered by Supabase. Admin access is restricted
            using database rules.
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
          <h2>Waitlist intelligence.</h2>
          <p>
            View signups, product interest, latest leads, and early demand signals.
          </p>
        </div>

        <div className="adminPanel">
          <button onClick={loadWaitlist}>Load Waitlist</button>
          {adminStatus && <p>{adminStatus}</p>}

          <div className="adminStats">
            <div><strong>{waitlist.length}</strong><span>Total signups</span></div>
            <div><strong>{forgeCount}</strong><span>ForgeOS interest</span></div>
            <div><strong>{filteredWaitlist.length}</strong><span>Filtered results</span></div>
          </div>

          <div className="filterBar">
            <button onClick={() => setFilter("All")}>All</button>
            {products.map((product) => (
              <button key={product} onClick={() => setFilter(product)}>
                {product}
              </button>
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
          <h2>Trust, privacy, and responsible use.</h2>
          <p>
            These pages explain how Nexi Labs handles personal data, acceptable
            use, cookies, early-access limitations, and data rights requests.
          </p>
        </div>

        <div className="legalCards">
          {Object.entries(legalPages).map(([key, title]) => (
            <button key={key} onClick={() => setPage(key)}>
              {title}
            </button>
          ))}
        </div>

        <p className="legalNote">
          These pages are practical startup legal drafts and not a substitute for
          professional legal advice.
        </p>
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
          <p>
            Original free-first tools for creators, communities, startups,
            students, gamers, and digital teams.
          </p>
          <strong>CommunityShieldOfficial@gmail.com</strong>
        </div>

        <div className="footerCols">
          <div>
            <h4>Legal</h4>
            {Object.entries(legalPages).map(([key, title]) => (
              <button key={key} onClick={() => setPage(key)}>
                {title}
              </button>
            ))}
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

function getProductDescription(product) {
  const descriptions = {
    ForgeOS: "A community operating system for managing roles, applications, announcements, and teams.",
    PulseDesk: "A support and safety dashboard for tickets, appeals, reports, and internal workflows.",
    LumaBuild: "A website and brand builder for creators, students, startups, and small teams.",
    OrbitChat: "A lightweight communication platform for communities, clubs, teams, and creators.",
    ArcadeCloud: "A social gaming network for rooms, mini-games, profiles, and creator experiences.",
    NovaLearn: "A learning platform for coding, online safety, business, design, and digital skills.",
  };

  return descriptions[product];
}

function LegalPage({ page, title, setPage }) {
  return (
    <main className="site">
      <section className="legalPage">
        <button className="backButton" onClick={() => setPage("home")}>
          ← Back to website
        </button>

        <p className="eyebrow">Nexi Labs Legal</p>
        <h1>{title}</h1>
        <p><strong>Last updated:</strong> May 2026</p>

        <div className="legalText">
          {page === "privacy" && <PrivacyPolicy />}
          {page === "terms" && <TermsOfService />}
          {page === "aup" && <AcceptableUsePolicy />}
          {page === "cookies" && <CookiePolicy />}
          {page === "disclaimer" && <Disclaimer />}
          {page === "data" && <DataRights />}
        </div>
      </section>
    </main>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <h2>1. Introduction</h2>
      <p>
        Nexi Labs respects user privacy. This Privacy Policy explains what
        information we collect, why we collect it, how it is used, and how users
        can contact us about their data.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We may collect names, email addresses, selected product interests,
        authentication details, waitlist submissions, basic account information,
        and technical information needed to operate the website.
      </p>

      <h2>3. How We Use Information</h2>
      <p>
        We use information to manage the waitlist, provide updates, operate
        authentication, improve services, prevent abuse, respond to requests,
        and maintain platform security.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        Nexi Labs currently uses Vercel for hosting, Supabase for database and
        authentication, Resend for email notifications, and GitHub for source
        control and deployment workflows.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        Waitlist and account data may be retained while Nexi Labs is in active
        development unless deletion is requested or the information is no longer
        needed.
      </p>

      <h2>6. Security</h2>
      <p>
        We use reasonable technical measures such as managed hosting, database
        security rules, authentication controls, and limited access to protect
        user information.
      </p>

      <h2>7. User Rights</h2>
      <p>
        Depending on your location, you may request access, correction, deletion,
        restriction, objection, or portability of your personal data.
      </p>

      <h2>8. Children’s Privacy</h2>
      <p>
        Nexi Labs is not intended for children under 13. Users under the age
        required by local law should only use services with appropriate consent.
      </p>

      <h2>9. International Processing</h2>
      <p>
        Data may be processed by third-party providers outside your country,
        depending on where the infrastructure provider operates.
      </p>

      <h2>10. Contact</h2>
      <p>
        Privacy questions can be sent to CommunityShieldOfficial@gmail.com.
      </p>
    </>
  );
}

function TermsOfService() {
  return (
    <>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By using Nexi Labs, you agree to use the website and any future services
        responsibly and in accordance with these terms.
      </p>

      <h2>2. Early Access Services</h2>
      <p>
        Nexi Labs products may be experimental, incomplete, unstable, or changed
        at any time during development.
      </p>

      <h2>3. Accounts</h2>
      <p>
        Users are responsible for keeping login details secure and for all
        activity that occurs under their account.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        Nexi Labs branding, website content, designs, code, product names, and
        related materials belong to Nexi Labs unless stated otherwise.
      </p>

      <h2>5. Prohibited Conduct</h2>
      <p>
        Users must not misuse the website, attempt unauthorized access, abuse
        services, spam systems, attack infrastructure, or interfere with others.
      </p>

      <h2>6. Availability</h2>
      <p>
        The website is hosted through third-party infrastructure. We do not
        guarantee uninterrupted availability during early development.
      </p>

      <h2>7. Termination</h2>
      <p>
        Nexi Labs may restrict or remove access if users misuse current or future
        services.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        Nexi Labs is provided as-is during early development. Use of the website
        and future services is at your own risk.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are intended to be governed by the laws of England and
        Wales, unless another legal framework is required.
      </p>

      <h2>10. Contact</h2>
      <p>
        Terms questions can be sent to CommunityShieldOfficial@gmail.com.
      </p>
    </>
  );
}

function AcceptableUsePolicy() {
  return (
    <>
      <h2>1. Purpose</h2>
      <p>
        Nexi Labs tools should be used for lawful, constructive, ethical, and
        community-focused purposes.
      </p>

      <h2>2. Allowed Use</h2>
      <p>
        Allowed use includes community management, learning, website creation,
        support workflows, team coordination, and responsible digital projects.
      </p>

      <h2>3. Prohibited Use</h2>
      <p>
        Users may not use Nexi Labs for harassment, abuse, threats, doxxing,
        spam, fraud, malware, unauthorized access, exploitation, or harmful
        automation.
      </p>

      <h2>4. Security Abuse</h2>
      <p>
        Attempting to bypass authentication, database rules, rate limits,
        security controls, or platform safeguards is prohibited.
      </p>

      <h2>5. Enforcement</h2>
      <p>
        Nexi Labs may restrict, suspend, or remove access where misuse is
        identified.
      </p>

      <h2>6. Reporting Abuse</h2>
      <p>
        Abuse reports can be sent to CommunityShieldOfficial@gmail.com.
      </p>
    </>
  );
}

function CookiePolicy() {
  return (
    <>
      <h2>1. What Cookies Are</h2>
      <p>
        Cookies and similar technologies help websites remember sessions,
        preferences, authentication states, and basic usage information.
      </p>

      <h2>2. Essential Cookies</h2>
      <p>
        Essential cookies may be used for login sessions, security, and basic
        website operation.
      </p>

      <h2>3. Analytics Cookies</h2>
      <p>
        If analytics are added later, they may help Nexi Labs understand page
        visits, traffic sources, and product interest.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        Third-party services such as Vercel, Supabase, or future analytics tools
        may use cookies or similar technologies.
      </p>

      <h2>5. Managing Cookies</h2>
      <p>
        Users can manage cookies through browser settings. Some functionality
        may not work correctly if essential cookies are disabled.
      </p>
    </>
  );
}

function Disclaimer() {
  return (
    <>
      <h2>1. Early Development</h2>
      <p>
        Nexi Labs is in early development. Information, product names, features,
        timelines, and availability may change.
      </p>

      <h2>2. No Professional Advice</h2>
      <p>
        Content on this website is informational only and should not be treated
        as legal, financial, technical, or professional advice.
      </p>

      <h2>3. No Warranty</h2>
      <p>
        The website and early services are provided as-is without warranties of
        availability, accuracy, suitability, or fitness for a particular purpose.
      </p>

      <h2>4. External Services</h2>
      <p>
        Nexi Labs uses third-party platforms. We are not responsible for outages,
        changes, or failures caused by external providers.
      </p>
    </>
  );
}

function DataRights() {
  return (
    <>
      <h2>1. Data Requests</h2>
      <p>
        Users may request access to, correction of, or deletion of personal data
        stored by Nexi Labs.
      </p>

      <h2>2. What To Include</h2>
      <p>
        Include your name, email address, the request type, and any information
        that helps us locate your data.
      </p>

      <h2>3. Request Types</h2>
      <p>
        You may request data access, correction, deletion, restriction,
        objection, or portability where applicable.
      </p>

      <h2>4. Contact</h2>
      <p>
        Send data rights requests to CommunityShieldOfficial@gmail.com.
      </p>

      <h2>5. Verification</h2>
      <p>
        We may need to verify your identity before completing a request.
      </p>
    </>
  );
}