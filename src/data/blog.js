export const blogPosts = [
  {
    slug: "practical-ai-where-businesses-should-start",
    category: "AI & automation",
    label: "FIELD GUIDE 01",
    title: "Practical AI: where businesses should start",
    excerpt:
      "A grounded way to find useful AI opportunities without starting with a tool, a trend, or a vague promise.",
    readTime: "8 min read",
    visual: "ai",
    intro:
      "The best first AI project is rarely the most impressive demo. It is the small, repeatable piece of work where better context, faster decisions, or less manual effort creates a visible difference.",
    flow: {
      title: "The useful-AI loop",
      note: "Move from a real constraint to a measured experiment.",
      steps: ["Find friction", "Check the data", "Design guardrails", "Pilot", "Measure & learn"],
    },
    sections: [
      {
        heading: "Start with friction, not features",
        paragraphs: [
          "A business does not need an AI strategy because every competitor has one. It needs a clear answer to a recurring problem: a support queue that takes too long to sort, a team searching across disconnected documents, or a forecast that arrives after the decision has already been made.",
          "Write the workflow down from trigger to outcome. Mark the steps that are repetitive, language-heavy, high-volume, or dependent on finding patterns in existing information. Those are opportunities to investigate—not automatic reasons to automate.",
        ],
        bullets: [
          "How often does the task happen?",
          "What does the delay or error cost?",
          "What must remain a human decision?",
          "What would a good outcome be measured against?",
        ],
      },
      {
        heading: "Check whether the data can support the idea",
        paragraphs: [
          "An AI workflow is only as useful as the information around it. Before choosing a model, check ownership, access, freshness, structure, and permission. A neat prototype built on sample data can hide a painful production problem: missing records, conflicting definitions, or sensitive information that should never be sent to an external service.",
          "Create a short data map. List the source, the person responsible for it, how often it changes, and the minimum information the workflow needs. This makes gaps visible early and keeps the first experiment narrow.",
        ],
        callout:
          "Good AI work includes deciding what the system must not see, infer, or do.",
      },
      {
        heading: "Design a bounded first release",
        paragraphs: [
          "A first release should have a small user group, a defined input, a visible output, and a clear escape hatch. For example: classify incoming requests into a few agreed categories, show the suggested category to a trained operator, and record whether the operator accepted or changed it.",
          "This is more valuable than hiding an untested assistant inside a critical process. People can compare the suggestion with the existing method, report edge cases, and build a useful evaluation set while the risk stays contained.",
        ],
        bullets: [
          "Keep a human accountable for consequential decisions.",
          "Log inputs, outputs, overrides, and failures where appropriate.",
          "Give users a way to correct the system without working around it.",
          "Set a stop condition before the pilot starts.",
        ],
      },
      {
        heading: "Measure usefulness, not novelty",
        paragraphs: [
          "A model can sound fluent and still make a workflow worse. Measure the thing the business cares about: time to resolution, first-pass accuracy, avoided rework, response consistency, or user confidence. Pair the number with a review of failure modes. A faster answer is not a win if it creates expensive follow-up work.",
          "The result of a pilot can be yes, no, or not yet. A well-designed no is progress: it prevents a costly rollout and tells the team what information, process change, or human support is missing.",
        ],
      },
    ],
    checklist: [
      "One workflow with a named owner",
      "A measurable baseline",
      "Approved data and access rules",
      "Human review for important decisions",
      "A pilot window and stop condition",
    ],
    sources: [
      {
        name: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        name: "NIST Generative AI Profile",
        url: "https://www.nist.gov/itl/ai-risk-management-framework/ai-rmf-generative-ai-profile",
      },
      {
        name: "UK Government — A guide to using AI in the public sector",
        url: "https://www.gov.uk/government/publications/ai-insights/guide-to-using-artificial-intelligence-in-the-public-sector",
      },
    ],
  },
  {
    slug: "why-product-discovery-comes-before-development",
    category: "Product & UX",
    label: "FIELD GUIDE 02",
    title: "Why product discovery should come before development",
    excerpt:
      "The cheapest feature to change is the one that is still a question. Discovery turns assumptions into evidence before code turns them into cost.",
    readTime: "7 min read",
    visual: "discovery",
    intro:
      "Development is good at making a defined thing real. It is a poor place to discover what that thing should have been. Product discovery creates a short, deliberate space to understand the user, the problem, and the smallest useful response before a team commits to a build.",
    flow: {
      title: "A discovery-to-delivery path",
      note: "Each step reduces a different kind of uncertainty.",
      steps: ["User need", "Problem framing", "Prototype", "Evidence", "Build"],
    },
    sections: [
      {
        heading: "Separate the request from the need",
        paragraphs: [
          "A request such as ‘add a dashboard’ or ‘build an app’ is a proposed solution. It may be right, but it is not yet a problem statement. Ask what someone is trying to accomplish, what blocks them today, and how they currently get around the block.",
          "The output is a user need in plain language, supported by what people do—not just what they say they want. That distinction keeps the team open to simpler answers and exposes when different audiences are being bundled into one vague requirement.",
        ],
        bullets: [
          "Who is trying to do what?",
          "What makes the task difficult or impossible today?",
          "What evidence shows this matters now?",
          "What would improve for the user and the business?",
        ],
      },
      {
        heading: "Make assumptions visible",
        paragraphs: [
          "Every early product idea contains assumptions about users, behaviour, value, technology, and adoption. Write them down and rank them by risk. A belief that nobody has tested—‘customers will upload their records’, for example—deserves attention before a polished interface.",
          "This is not bureaucracy. It is a way to spend research time where it can change the decision. Some assumptions can be checked with interviews, some with existing data, and some with a rough prototype or a manual service.",
        ],
        callout:
          "Discovery is not a phase that proves the original idea. It is a practice that gives the team permission to change it.",
      },
      {
        heading: "Prototype the riskiest part",
        paragraphs: [
          "A prototype should answer a question, not win a design award. If the risk is comprehension, test a rough flow. If it is willingness to act, test the proposition and call to action. If it is operational feasibility, run the service manually for a small group.",
          "Put the prototype in front of people who resemble the intended users. Observe where they pause, what they misunderstand, and what they do without being prompted. Capture behaviour and quotes together; either one on its own can be misleading.",
        ],
      },
      {
        heading: "Turn evidence into a build decision",
        paragraphs: [
          "End discovery with a decision, not a pile of notes. The team should be able to explain the user, the job to be done, the proposed first release, the evidence behind it, and the risks that remain. If the evidence is weak, the right next step may be more research or a smaller experiment.",
          "When a build is justified, keep the first scope honest. Define what is deliberately out, how success will be observed after launch, and which learning will determine the next iteration.",
        ],
      },
    ],
    checklist: [
      "A defined audience and user need",
      "Ranked assumptions and risks",
      "A prototype aimed at one key question",
      "Observed evidence from representative users",
      "A decision with explicit out-of-scope work",
    ],
    sources: [
      {
        name: "UK Government Service Manual — Start by learning user needs",
        url: "https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs",
      },
      {
        name: "UK Government Service Manual — Test with people",
        url: "https://www.gov.uk/service-manual/user-research/using-user-research-in-your-service",
      },
      {
        name: "U.S. Digital Services Playbook",
        url: "https://playbook.cio.gov/",
      },
    ],
  },
  {
    slug: "when-your-business-needs-a-website-redesign",
    category: "Web & performance",
    label: "FIELD GUIDE 03",
    title: "When does your business need a website redesign?",
    excerpt:
      "A redesign should solve a business and user problem—not replace a colour palette because the current one feels old.",
    readTime: "8 min read",
    visual: "website",
    intro:
      "A website can look dated and still work. It can also look polished while quietly losing enquiries, search visibility, and trust. The useful question is not ‘does it need a new design?’ but ‘where does the current experience stop helping people move forward?’",
    flow: {
      title: "A redesign diagnosis",
      note: "Find the constraint before choosing the treatment.",
      steps: ["Business goal", "User evidence", "Technical audit", "Prioritise", "Release & learn"],
    },
    sections: [
      {
        heading: "Start with the job the site must do",
        paragraphs: [
          "Write the primary job of each important page. A service page may need to help a qualified visitor understand fit and start a conversation. A product page may need to help someone compare options and buy. If a page has five competing jobs, the redesign problem may be positioning and content—not layout.",
          "Connect those jobs to a small set of outcomes: qualified enquiries, completed purchases, useful self-service, applications, or visits to a physical location. This gives design decisions something firmer than preference to answer to.",
        ],
      },
      {
        heading: "Look for evidence of friction",
        paragraphs: [
          "Talk to customers and the people who answer their questions. Review search queries, support messages, form abandonment, conversion paths, and the pages that receive traffic but create no next step. A short task test can reveal a problem that analytics cannot explain: people may reach the right page and still not understand it.",
          "Do not treat one metric as a verdict. A high exit rate can be normal on a contact-confirmation page and concerning on a pricing page. Always interpret the number in the context of the page’s job.",
        ],
        bullets: [
          "Can a new visitor explain what you do quickly?",
          "Can the right person find proof and a next step?",
          "Does the experience work on a phone and with a keyboard?",
          "Can the team update important content safely?",
        ],
      },
      {
        heading: "Audit the foundations before the surface",
        paragraphs: [
          "Performance, accessibility, content structure, security, and maintainability are redesign concerns. Google’s Core Web Vitals are useful signals for loading, responsiveness, and visual stability, but they are not a substitute for observing real users. WCAG provides a baseline for making content and interaction more accessible.",
          "Map the current site before replacing it. Record templates, redirects, metadata, structured content, integrations, forms, and analytics. A visually successful launch can still damage search traffic or create operational work if these dependencies disappear unnoticed.",
        ],
        callout:
          "A redesign is complete when the new experience is easier to use and easier to operate—not when the old screenshot is gone.",
      },
      {
        heading: "Redesign in slices, not in suspense",
        paragraphs: [
          "A full replacement is not the only path. Start with the page or journey where evidence shows the largest gap. Improve its message, structure, interaction, and technical health, then compare the result with a baseline. This keeps learning close to delivery and lowers the risk of a dramatic launch with no useful feedback loop.",
          "If a full rebuild is necessary, preserve URLs where possible, plan redirects, test forms and tracking, and release with a rollback plan. The goal is continuity for users while the experience improves underneath.",
        ],
      },
    ],
    checklist: [
      "A page-level job and measurable outcome",
      "Evidence from users, content, and behaviour",
      "Performance and accessibility baseline",
      "A dependency and URL inventory",
      "A staged release and rollback plan",
    ],
    sources: [
      {
        name: "web.dev — Core Web Vitals",
        url: "https://web.dev/articles/vitals",
      },
      {
        name: "Google Search Central — Page experience",
        url: "https://developers.google.com/search/docs/appearance/page-experience",
      },
      {
        name: "W3C — Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
      },
    ],
  },
  {
    slug: "why-brand-strategy-comes-before-digital-marketing",
    category: "Marketing & growth",
    label: "FIELD GUIDE 04",
    title: "Why brand strategy should come before digital marketing",
    excerpt:
      "Campaigns can buy attention. Strategy gives that attention a clear reason to stay, trust, and act.",
    readTime: "7 min read",
    visual: "brand",
    intro:
      "Digital marketing makes a promise visible at scale. If the promise is unclear, inconsistent, or aimed at everyone, more reach usually creates more noise. Brand strategy gives a team the decisions it needs before channels, formats, and media budgets enter the room.",
    flow: {
      title: "From meaning to measurable growth",
      note: "A clear position makes every channel work harder.",
      steps: ["Audience truth", "Position", "Message", "Experience", "Measure"],
    },
    sections: [
      {
        heading: "Define the choice you want to own",
        paragraphs: [
          "A position is not a slogan. It is a focused answer to three questions: who is this for, what important problem do we solve, and why should someone believe us instead of choosing an alternative? The answer should be specific enough to guide what the business says yes and no to.",
          "Start with customer language, sales conversations, competitor patterns, and the capability the business can consistently deliver. A position built only from internal ambition will sound polished and remain hard to recognise in the market.",
        ],
      },
      {
        heading: "Turn the position into a message system",
        paragraphs: [
          "One headline cannot carry an entire business. Build a hierarchy: a central promise, supporting reasons to believe, proof, and the next action. Different channels can express the system in different lengths without inventing a new identity every week.",
          "This is where creative direction becomes useful. Voice, visual cues, examples, and boundaries help a team produce work that feels related while leaving room for campaigns to be relevant to their context.",
        ],
        bullets: [
          "Core promise: the change customers are buying",
          "Proof: evidence that makes the promise credible",
          "Voice: how the business sounds when it is being itself",
          "Action: the useful next step for this audience",
        ],
      },
      {
        heading: "Connect the message to the experience",
        paragraphs: [
          "Trust is formed across the whole journey: an ad, a search result, a landing page, a sales call, an onboarding email, and the product itself. If each touchpoint makes a different promise, performance problems may be positioning problems in disguise.",
          "Review the journey from the audience’s perspective. What did they expect after the click? What proof did they need next? Where did the language become internal, vague, or more ambitious than the actual experience? Fixing that chain often improves more than changing a single ad.",
        ],
        callout:
          "Consistency is not repetition. It is keeping the same promise true as the context changes.",
      },
      {
        heading: "Measure the system, not just the post",
        paragraphs: [
          "Marketing measurement should follow the intended decision. Track channel activity, but connect it to meaningful outcomes such as qualified conversations, completed actions, retained customers, or revenue where the data supports that connection. Document definitions before reporting so a ‘lead’ means the same thing to marketing and sales.",
          "Short-term response and long-term recognition answer different questions. Use the smallest measurement system the team can maintain, review it regularly, and avoid turning every creative choice into a false precision exercise.",
        ],
      },
    ],
    checklist: [
      "A defined audience and competitive context",
      "A focused position and promise",
      "Proof that supports the promise",
      "A shared message and voice system",
      "Outcome definitions accepted by the team",
    ],
    sources: [
      {
        name: "Google Search Central — SEO Starter Guide",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
      },
      {
        name: "Google Analytics — Measurement planning",
        url: "https://support.google.com/analytics/answer/10822630",
      },
      {
        name: "UK Government Communication Service — Evaluation framework",
        url: "https://gcs.civilservice.gov.uk/publications/evaluation-framework/",
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-technology-partner",
    category: "Digital strategy",
    label: "FIELD GUIDE 05",
    title: "How to choose the right technology partner",
    excerpt:
      "The strongest partner is not the one with the longest capability list. It is the one that makes decisions, risks, ownership, and outcomes clear.",
    readTime: "8 min read",
    visual: "partner",
    intro:
      "Choosing a technology partner is a business decision disguised as a vendor decision. The work may include design and code, but the relationship will also shape pace, risk, knowledge, and the quality of decisions your team can make after launch.",
    flow: {
      title: "A partner selection path",
      note: "Compare how teams think and work, not only what they show.",
      steps: ["Define outcome", "Shortlist fit", "Test thinking", "Agree delivery", "Own the result"],
    },
    sections: [
      {
        heading: "Write the brief around an outcome",
        paragraphs: [
          "Before asking for proposals, describe the change the project should create. Include the users, current constraint, desired outcome, known dependencies, decision deadline, budget range if available, and what success will look like after release.",
          "A clear brief does not need to prescribe the solution. It gives partners enough context to challenge the right assumptions and makes proposals easier to compare. If a partner cannot explain what is still unknown, the proposal is probably pretending certainty.",
        ],
      },
      {
        heading: "Evaluate the working model",
        paragraphs: [
          "Ask who will do the work, who makes design and technical decisions, how often you will see progress, and what happens when scope changes. Look for a named team rather than only a sales presentation. You should understand how feedback becomes a decision and how decisions are recorded.",
          "Review relevant work for the quality of thinking, not visual similarity. Ask what was difficult, what changed, what the team would do differently, and what the client owned after launch. A credible partner can discuss limits without turning them into a sales problem.",
        ],
        bullets: [
          "Who is accountable for the outcome?",
          "What will be delivered at each checkpoint?",
          "How are risks, changes, and approvals handled?",
          "How is knowledge transferred to the client team?",
        ],
      },
      {
        heading: "Use a small test to expose the real fit",
        paragraphs: [
          "A short paid discovery or technical assessment can be more informative than a large pitch. Give the team one meaningful question: map the current journey, prototype a critical interaction, audit the platform, or define an implementation path. The output should be useful even if you do not continue.",
          "Pay attention to the process. Do they ask precise questions? Do they make uncertainty visible? Can they explain trade-offs to a non-specialist? The test should not be free speculative work; it should be a bounded piece of professional work with an agreed output.",
        ],
        callout:
          "Trust grows when a partner makes the hard parts visible early enough to act on them.",
      },
      {
        heading: "Protect the handover before kickoff",
        paragraphs: [
          "Agree ownership of source code, design files, domains, accounts, data, documentation, and credentials. Define environments, support expectations, security responsibilities, acceptance criteria, and what happens when the engagement ends. These details are not pessimistic; they are how both sides keep control of the asset they are building.",
          "Finally, name the people who will make decisions on both sides. A good partner adds capability without making the client permanently dependent on a black box.",
        ],
      },
    ],
    checklist: [
      "Outcome-led brief with known constraints",
      "Named delivery team and decision owners",
      "Comparable evidence and honest trade-offs",
      "Bounded paid test or discovery step",
      "Written ownership, security, and handover terms",
    ],
    sources: [
      {
        name: "NIST Cybersecurity Framework 2.0",
        url: "https://www.nist.gov/cyberframework",
      },
      {
        name: "OWASP Application Security Verification Standard",
        url: "https://owasp.org/www-project-application-security-verification-standard/",
      },
      {
        name: "UK Government Service Manual — Agile delivery",
        url: "https://www.gov.uk/service-manual/agile-delivery",
      },
    ],
  },
];

export function getPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
