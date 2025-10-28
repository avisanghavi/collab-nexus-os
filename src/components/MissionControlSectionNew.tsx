import { UnifiedDashboardMacbook } from "@/components/ui/unified-dashboard-macbook";

// Import real logos for the connected dashboard
import gmailLogo from "@/assets/logos/gmail.svg";
import outlookLogo from "@/assets/logos/outlook.png";
import googleCalendarLogo from "@/assets/logos/google-calendar.svg";
import teamsLogo from "@/assets/logos/teams.png";
import slackLogo from "@/assets/logos/slack.svg";
import jiraLogo from "@/assets/logos/jira.svg";
import confluenceLogo from "@/assets/logos/confluence.svg";
import githubLogo from "@/assets/logos/github.svg";
import hubspotLogo from "@/assets/logos/hubspot.png";
import openaiLogo from "@/assets/logos/openai.svg";

const MissionControlSectionNew = () => {
  // Scattered positions on the dashboard - widely spread for dramatic effect
  const scatteredPositions = [
    { x: -350, y: -150, rotate: -25 },    // Gmail - far top left
    { x: -180, y: -120, rotate: 18 },     // Outlook - top left
    { x: 20, y: -140, rotate: -15 },      // Calendar - top center
    { x: 200, y: -110, rotate: 22 },      // Teams - top right
    { x: 380, y: -130, rotate: -18 },     // Slack - far top right
    { x: -460, y: -100, rotate: 15 },      // Jira - bottom left
    { x: -280, y: -30, rotate: -20 },     // Confluence - bottom left-center
    { x: -30, y: -20, rotate: 25 },        // GitHub - bottom center
    { x: 180, y: -10, rotate: -22 },      // HubSpot - bottom right-center
    { x: 350, y: -25, rotate: 17 },       // OpenAI - far bottom right
  ];

  const connectedLogos = [
    { src: gmailLogo, name: "Gmail" },
    { src: outlookLogo, name: "Outlook" },
    { src: googleCalendarLogo, name: "Calendar" },
    { src: teamsLogo, name: "Teams" },
    { src: slackLogo, name: "Slack" },
    { src: jiraLogo, name: "Jira" },
    { src: confluenceLogo, name: "Confluence" },
    { src: githubLogo, name: "GitHub" },
    { src: hubspotLogo, name: "HubSpot" },
    { src: openaiLogo, name: "OpenAI" },
  ];

  return (
    <section
      id="mission-control"
      className="relative -mt-[35rem] overflow-visible"
      aria-label="Mission Control: Unified Dashboard with Connected Apps"
    >
      {/* Top border with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Background gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <UnifiedDashboardMacbook
        logos={connectedLogos}
        scatteredPositions={scatteredPositions}
        macbookSrc="/dashboard.png"
      />
    </section>
  );
};

export default MissionControlSectionNew;