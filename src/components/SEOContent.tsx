// SEO-optimized content component with structured data
// This content is hidden from view but crawlable by search engines

const SEOContent = () => {
  return (
    <>
      {/* FAQ Schema for AI SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is HeyJarvis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HeyJarvis is a universal collaboration platform that unifies all your productivity tools into a single dashboard. It connects Gmail, Slack, Microsoft Teams, GitHub, HubSpot, Google Calendar, Jira, Confluence, and OpenAI into one seamless interface, providing real-time clarity and unified velocity for modern teams."
                }
              },
              {
                "@type": "Question",
                "name": "What tools does HeyJarvis integrate with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HeyJarvis integrates with Gmail, Outlook, Google Calendar, Microsoft Teams, Slack, Jira, Confluence, GitHub, HubSpot, and OpenAI. These integrations allow you to manage all your communications, tasks, code, and customer data from a single unified dashboard."
                }
              },
              {
                "@type": "Question",
                "name": "How does HeyJarvis improve productivity?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HeyJarvis improves productivity by eliminating context switching between multiple tools. It provides a unified view of all your work, real-time notifications, and AI-powered insights. Teams report significant time savings by having all their tools accessible from one dashboard with context united, clarity unlocked, and progress accelerated."
                }
              },
              {
                "@type": "Question",
                "name": "Is HeyJarvis free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, HeyJarvis offers a free forever plan with no credit card required. You can join the waitlist to get early access to the platform and start transforming your workflow immediately."
                }
              },
              {
                "@type": "Question",
                "name": "How do I get started with HeyJarvis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Getting started with HeyJarvis is simple. Join our waitlist by entering your email on our homepage. Once you're approved, you'll receive access to connect your tools and set up your unified dashboard. No technical knowledge required."
                }
              }
            ]
          })
        }}
      />

      {/* Hidden SEO content - crawlable but not visible */}
      <div className="sr-only" aria-hidden="true">
        <h2>Transform Your Workflow with HeyJarvis</h2>
        <p>
          HeyJarvis is the ultimate productivity platform for modern teams. Our universal collaboration layer
          brings together all your essential tools - Gmail, Slack, Microsoft Teams, GitHub, HubSpot, and more -
          into a single, unified dashboard.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li>Unified Dashboard: Access all your tools from one central location</li>
          <li>Real-time Collaboration: Stay connected with your team across all platforms</li>
          <li>Gmail Integration: Manage your emails without leaving your workflow</li>
          <li>Slack Integration: Keep team conversations in sync</li>
          <li>Microsoft Teams Integration: Seamless video calls and chat</li>
          <li>GitHub Integration: Track code changes and pull requests</li>
          <li>HubSpot Integration: Manage customer relationships effortlessly</li>
          <li>Google Calendar Integration: Never miss a meeting</li>
          <li>Jira Integration: Track projects and sprints</li>
          <li>Confluence Integration: Access documentation instantly</li>
          <li>OpenAI Integration: AI-powered insights and automation</li>
        </ul>

        <h3>Why Choose HeyJarvis?</h3>
        <p>
          Context United: Stop switching between tabs and apps. HeyJarvis brings everything together.
          Clarity Unlocked: See the full picture of your work at a glance with our intuitive interface.
          Progress Accelerated: Save hours every week by eliminating context switching and tool fragmentation.
        </p>

        <h3>Perfect for B2B SaaS Teams</h3>
        <p>
          Whether you're a startup or an enterprise, HeyJarvis scales with your needs. Join over 500 B2B SaaS
          companies already using HeyJarvis to streamline their workflows and boost productivity.
        </p>

        <h3>Get Started Today</h3>
        <p>
          Join our waitlist to get early access. Free forever plan available. No credit card required.
          Transform your workflow in minutes, not hours.
        </p>
      </div>
    </>
  );
};

export default SEOContent;

