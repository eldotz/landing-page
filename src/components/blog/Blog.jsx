import { useState } from "react";
import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";
import IconLibrary from "../IconLibrary.jsx";
import BlogVisual from "./BlogVisual.jsx";
import { blogPosts, getPost } from "../../data/blog.js";

function Arrow() {
  return (
    <svg className="blog-arrow" aria-hidden="true">
      <use href="#arrow-up-right" />
    </svg>
  );
}

function BlogShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <IconLibrary />
      <Header menuOpen={menuOpen} onMenuChange={setMenuOpen} isBlog />
      <main id="main" className="blog-shell" inert={menuOpen}>
        {children}
      </main>
      <Footer menuOpen={menuOpen} onPrivacyOpen={() => {}} isBlog />
    </>
  );
}

function PostCard({ post, featured = false }) {
  return (
    <a className={`blog-card${featured ? " blog-card-featured" : ""}`} href={`/blog/${post.slug}`}>
      <BlogVisual kind={post.visual} compact />
      <div className="blog-card-copy">
        <div className="blog-card-meta"><span>{post.category}</span><span>{post.readTime}</span></div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="blog-card-link">Read field guide <Arrow /></span>
      </div>
    </a>
  );
}

function BlogIndex() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const featured = blogPosts[0];
  return (
    <BlogShell>
      <section className="blog-hero section-dark">
        <div className="container">
          <div className="blog-hero-top"><span className="eyebrow"><i /> ELDOTZ / NOTES</span><span className="blog-hero-index">05 FIELD GUIDES / 01</span></div>
          <div className="blog-hero-grid">
            <div>
              <p className="blog-kicker">Ideas for the connected work</p>
              <h1>Make the next<br /><em>move</em> clearer.</h1>
              <p className="blog-hero-intro">Practical notes on technology, products, brand, and growth—written for teams turning good intentions into useful outcomes.</p>
            </div>
            <div className="blog-hero-orbit" aria-hidden="true"><span className="orbit-ring ring-a" /><span className="orbit-ring ring-b" /><span className="orbit-dot" /><span className="orbit-label">THOUGHT / 01</span></div>
          </div>
        </div>
      </section>
      <section className="blog-index section-light">
        <div className="container">
          <div className="blog-section-head"><div><span className="section-label"><span className="label-square" /> START HERE</span><h2>Useful before<br /><span className="text-muted">impressive.</span></h2></div><p>Five first principles for making better digital decisions. No borrowed case studies. No inflated claims. Just considered guidance, grounded in established practice.</p></div>
          <PostCard post={featured} featured />
          <div className="blog-grid">{blogPosts.slice(1).map((post) => <PostCard key={post.slug} post={post} />)}</div>
          <div className="blog-subscribe">
            <div><span className="section-label"><span className="label-square" /> OCCASIONAL, NOT CONSTANT</span><h2>Good thinking.<br /><span className="text-muted">Inbox-sized.</span></h2></div>
            <div className="blog-subscribe-form">
              <p>Get a considered note when we publish something worth your attention.</p>
              {submitted ? <p className="blog-form-success">Thanks. We will keep this list human-sized.</p> : <form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); }}><label className="sr-only" htmlFor="blog-email">Email address</label><input id="blog-email" type="email" required placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Subscribe <Arrow /></button></form>}
              <small>No automation claim here: connect this form to a consented email provider before launch.</small>
            </div>
          </div>
        </div>
      </section>
    </BlogShell>
  );
}

function FlowChart({ flow }) {
  return <div className="flow-chart"><div className="flow-heading"><div><span className="section-label"><span className="label-square" /> THE PATH</span><h2>{flow.title}</h2></div><p>{flow.note}</p></div><div className="flow-steps">{flow.steps.map((step, index) => <div className="flow-step" key={step}><span className="flow-number">0{index + 1}</span><strong>{step}</strong>{index < flow.steps.length - 1 && <span className="flow-connector" aria-hidden="true">→</span>}</div>)}</div></div>;
}

function Article({ post }) {
  const next = blogPosts[(blogPosts.indexOf(post) + 1) % blogPosts.length];
  return (
    <BlogShell>
      <article className="blog-article">
        <header className="article-header section-dark">
          <div className="container">
            <a className="article-back" href="/blog">← All notes</a>
            <div className="article-meta"><span>{post.label}</span><span>{post.category}</span><span>{post.readTime}</span></div>
            <h1>{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
            <div className="article-visual"><BlogVisual kind={post.visual} /></div>
          </div>
        </header>
        <div className="container article-layout">
          <aside className="article-aside"><div className="article-aside-sticky"><span className="section-label"><span className="label-square" /> IN THIS NOTE</span><ol>{post.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>0{index + 1} <span>{section.heading}</span></a></li>)}</ol><a className="article-contact" href="/#contact">Talk through a challenge <Arrow /></a></div></aside>
          <div className="article-body">
            <p className="article-intro">{post.intro}</p>
            <FlowChart flow={post.flow} />
            {post.sections.map((section, index) => <section className="article-section" id={`section-${index + 1}`} key={section.heading}><span className="article-section-number">0{index + 1}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.callout && <blockquote>{section.callout}</blockquote>}</section>)}
            <section className="article-checklist"><span className="section-label"><span className="label-square" /> BEFORE YOU START</span><h2>A useful brief<br /><span className="text-muted">has edges.</span></h2><ul>{post.checklist.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul></section>
            <section className="article-sources"><span className="section-label"><span className="label-square" /> SOURCES & FURTHER READING</span><p>This note is original editorial work. These public references informed its framework; they are not presented as endorsements or copied source material.</p><ul>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name} <Arrow /></a></li>)}</ul></section>
          </div>
        </div>
      </article>
      <section className="article-next section-dark"><div className="container"><span className="section-label"><span className="label-square" /> KEEP CONNECTING THE DOTS</span><p>Next field guide</p><a href={`/blog/${next.slug}`}><h2>{next.title}</h2><Arrow /></a></div></section>
    </BlogShell>
  );
}

export default function Blog({ slug }) {
  const post = slug ? getPost(slug) : null;
  return post ? <Article post={post} /> : <BlogIndex />;
}
