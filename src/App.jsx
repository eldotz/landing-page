import { useEffect, useState } from "react";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import IconLibrary from "./components/IconLibrary.jsx";
import Dialogs from "./components/dialogs/Dialogs.jsx";
import { usePageEffects } from "./hooks/usePageEffects.js";
import Hero from "./sections/Hero.jsx";
import Intro from "./sections/Intro.jsx";
import Expertise from "./sections/Expertise.jsx";
import Work from "./sections/Work.jsx";
import Approach from "./sections/Approach.jsx";
import About from "./sections/About.jsx";
import FAQ from "./sections/FAQ.jsx";
import Contact from "./sections/Contact.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState("");
  const [project, setProject] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  usePageEffects();
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 700px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", close);
    document.body.classList.toggle("nav-open", menuOpen);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", close);
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <IconLibrary />
      <Header menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <main id="main" inert={menuOpen}>
        <Hero />
        <Intro />
        <Expertise onServiceSelect={setService} />
        <Work onProjectSelect={setProject} />
        <Approach />
        <About />
        <FAQ />
        <Contact service={service} onServiceChange={setService} />
      </main>
      <Footer menuOpen={menuOpen} onPrivacyOpen={() => setPrivacyOpen(true)} />
      <Dialogs
        project={project}
        privacyOpen={privacyOpen}
        onProjectClose={() => setProject(null)}
        onPrivacyClose={() => setPrivacyOpen(false)}
      />
    </>
  );
}
