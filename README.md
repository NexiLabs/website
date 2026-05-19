# Nexi Labs Website

![Status](https://img.shields.io/badge/status-early%20development-blue)
![License](https://img.shields.io/badge/license-private-red)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-61dafb)
![Deployment](https://img.shields.io/badge/deployment-Vercel-black)

## Overview

This repository contains the official website for **Nexi Labs**, a free-first technology company building original software products for communities, creators, startups, students, gamers, and digital teams.

The website acts as the central landing page for the Nexi Labs ecosystem. It introduces the company, explains the mission, presents the product lineup, collects early waitlist interest, and prepares the foundation for future product launches.

Nexi Labs is currently in early development. The initial focus is to create a professional public-facing website, validate product ideas, collect user interest, and prepare the technical foundation for future products.

---

## Mission

Nexi Labs exists to make useful digital tools more accessible.

Many creators, students, small teams, and online communities struggle to start because professional tools are often expensive, fragmented, or overly complex. Nexi Labs is designed around a free-first approach, giving people access to practical software during the launch and early access phases.

Core mission:

> Build better tools. Make them free first.

---

## Company Positioning

Nexi Labs is positioned as a modern software company focused on:

- Community platforms
- Support and safety tools
- Website creation tools
- Communication systems
- Social gaming experiences
- Learning platforms
- Creator-focused software
- Startup-friendly infrastructure

The company is designed as a product ecosystem rather than a single application.

---

## Product Ecosystem

### ForgeOS

**Community Operating System**

ForgeOS is planned as the first major product under Nexi Labs. It will help communities launch, organize, and manage themselves through one unified dashboard.

Planned features:

- Community profiles
- Role management
- Application forms
- Staff management
- Events
- Announcements
- Moderation tools
- Member directories
- Internal dashboards
- Community settings

---

### PulseDesk

**Support & Safety Hub**

PulseDesk is a support and incident management platform for teams, communities, and small organizations.

Planned features:

- Ticket management
- Incident reporting
- Appeal handling
- Case notes
- Status tracking
- Staff assignment
- Priority levels
- Response history
- Safety workflows
- Internal review tools

---

### LumaBuild

**Website & Brand Builder**

LumaBuild is planned as a simple website and brand builder for people who need an online presence without complex setup.

Planned features:

- Website templates
- Landing page builder
- Brand profile pages
- Custom sections
- Basic SEO settings
- Contact forms
- Creator pages
- Community pages
- Startup pages
- Export or publish options

---

### OrbitChat

**Communication Platform**

OrbitChat is a lightweight communication platform concept for groups, creators, clubs, teams, and communities.

Planned features:

- Servers or spaces
- Channels
- Direct messages
- Group chats
- Roles
- Permissions
- Announcements
- Community moderation
- Profiles
- Notifications

---

### ArcadeCloud

**Social Gaming Network**

ArcadeCloud is a creator-first social gaming network where users can create, play, and socialize.

Planned features:

- User profiles
- Rooms
- Mini-games
- Avatars
- Cosmetics
- Creator tools
- Social spaces
- Friend systems
- Community events
- Marketplace concepts

---

### NovaLearn

**Learning Platform**

NovaLearn is a free learning platform for practical digital skills.

Planned learning areas:

- Coding
- Web development
- Game development
- Online safety
- Business basics
- Design
- Branding
- Community management
- Digital tools
- Career skills

---

## Current Website Features

The current website includes:

- Modern landing page
- Fixed navigation bar
- Hero section
- Product showcase
- Mission section
- Roadmap section
- Waitlist form
- Success confirmation message
- Responsive layout
- Smooth scrolling
- Animated background orbs
- Glassmorphism-style cards
- Mobile-friendly design

---

## Planned Website Features

Future website upgrades may include:

- Real backend waitlist storage
- Supabase database integration
- Authentication
- User dashboard
- Product pages
- Blog or updates section
- Careers page
- Contact form
- Status page integration
- Legal pages
- Privacy policy
- Terms of service
- Cookie notice
- Admin dashboard
- Analytics
- Newsletter system
- Vercel deployment
- Custom domain

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend / Services Planned

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Vercel hosting
- GitHub Actions
- Future API services

### Tooling

- Git
- GitHub
- GitHub CLI
- npm
- ESLint
- Vite dev server

---

## Repository Structure

Current structure:

```txt
website/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── supabase.js
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## Important Security Notice

Environment files should not be committed to GitHub.

Do not commit:

```txt
.env
.env.local
.env.production
.env.development
```

Environment variables should be stored locally during development and configured in Vercel during deployment.

Expected environment variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/NexiLabs/website.git
```

Move into the project:

```bash
cd website
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The local development server will usually run at:

```txt
http://localhost:5173
```

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Runs the website locally with hot reload.

### Build for Production

```bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

Runs the production build locally for testing.

### Lint

```bash
npm run lint
```

Runs linting checks.

---

## Development Workflow

Recommended workflow:

1. Create or switch to a feature branch.
2. Make changes locally.
3. Test with `npm run dev`.
4. Build with `npm run build`.
5. Commit changes.
6. Push to GitHub.
7. Deploy through Vercel when ready.

Example:

```bash
git checkout -b feature/waitlist-backend
git add .
git commit -m "Add waitlist backend integration"
git push -u origin feature/waitlist-backend
```

---

## Git Commit Style

Recommended commit examples:

```txt
Initial Nexi Labs website
Update homepage design
Add waitlist form
Add Supabase client
Create product section
Improve responsive layout
Add roadmap section
Fix mobile navigation
Update README documentation
```

---

## Deployment Plan

The website is intended to be deployed on Vercel.

Planned deployment flow:

1. Push code to GitHub.
2. Connect `NexiLabs/website` to Vercel.
3. Configure environment variables in Vercel.
4. Deploy production build.
5. Connect custom domain later.

The website should run 24/7 on Vercel without requiring a local laptop or PC to stay turned on.

---

## Supabase Integration Plan

Supabase will be used for:

- Waitlist submissions
- Authentication
- User profiles
- Product interest tracking
- Admin dashboard data
- Future product backend services

Planned waitlist table:

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  product text not null,
  created_at timestamp with time zone default now()
);
```

Planned security:

```sql
alter table waitlist enable row level security;
```

Basic insert policy:

```sql
create policy "Anyone can join waitlist"
on waitlist
for insert
to anon
with check (true);
```

---

## Roadmap

### Phase 1: Website Foundation

- Create Nexi Labs brand direction
- Build landing page
- Add product cards
- Add roadmap section
- Add waitlist form
- Push website to GitHub

### Phase 2: Backend Setup

- Create Supabase project
- Add waitlist database
- Connect frontend form to Supabase
- Add environment variables
- Test submissions

### Phase 3: Deployment

- Deploy to Vercel
- Configure build settings
- Add production environment variables
- Test live website
- Connect custom domain later

### Phase 4: Product Pages

- Add `/products/forgeos`
- Add `/products/pulsedesk`
- Add `/products/lumabuild`
- Add `/products/orbitchat`
- Add `/products/arcadecloud`
- Add `/products/novalearn`

### Phase 5: Authentication

- Add sign up
- Add login
- Add logout
- Add user dashboard
- Add protected routes
- Add user profile table

### Phase 6: ForgeOS MVP

- Create ForgeOS product repository
- Create product requirements document
- Build dashboard layout
- Add community creation
- Add roles
- Add applications
- Add basic moderation tools

---

## Design Direction

Nexi Labs currently uses a modern dark interface with:

- Deep navy backgrounds
- Green and blue gradient accents
- Glassmorphism panels
- Soft glow effects
- Rounded cards
- Clean typography
- Smooth hover states
- Startup-style landing page layout

Primary visual themes:

- Accessible technology
- Future-focused software
- Clean product ecosystem
- Trust and professionalism
- Free-first launch strategy

---

## Brand Message

Short version:

> Nexi Labs builds original free-first software for creators, communities, startups, students, gamers, and digital teams.

Long version:

> Nexi Labs is a free-first technology company creating practical digital tools that help people launch communities, manage support, build websites, communicate, learn, and create online experiences without being blocked by cost during the early stages.

---

## Repository Status

This repository is currently private and in early development.

Current status:

```txt
Stage: Early Development
Visibility: Private
Primary product: Nexi Labs Website
Deployment: Planned
Backend: Planned
Auth: Planned
Database: Planned
```

---

## Contributing

This repository is currently maintained privately.

Future contribution rules may include:

- Use feature branches
- Open pull requests for major changes
- Keep commits clear and descriptive
- Do not commit secrets
- Test before pushing
- Follow project style conventions

---

## Maintainer

Created and maintained by **Nexi Labs**.

GitHub organization:

```txt
https://github.com/NexiLabs
```

---

## License

This project is private and proprietary unless a license is added later.

No permission is granted to copy, distribute, modify, or reuse the source code without approval from Nexi Labs.

---

## Final Note

This website is the foundation for the Nexi Labs ecosystem.

The long-term goal is to grow from a landing page into a full software company with multiple connected products, shared infrastructure, and free-first tools that help people build real communities, projects, and digital platforms.
