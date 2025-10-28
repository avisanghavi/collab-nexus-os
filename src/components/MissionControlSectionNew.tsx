import { DashboardScroll } from "@/components/ui/dashboard-scroll";

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
  // Scattered positions on the dashboard - spread across the panel
  const scatteredPositions = [
    { x: -280, y: -120, rotate: -15 },    // Gmail - top left
    { x: -140, y: -80, rotate: 10 },      // Outlook - top left-center
    { x: 0, y: -100, rotate: -8 },        // Calendar - top center
    { x: 140, y: -90, rotate: 12 },       // Teams - top right-center
    { x: 280, y: -110, rotate: -10 },     // Slack - top right
    { x: -320, y: 40, rotate: 8 },        // Jira - bottom left
    { x: -160, y: 60, rotate: -12 },      // Confluence - bottom left-center
    { x: 0, y: 50, rotate: 15 },          // GitHub - bottom center
    { x: 160, y: 45, rotate: -18 },       // HubSpot - bottom right-center
    { x: 320, y: 55, rotate: 10 },        // OpenAI - bottom right
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
      className="relative bg-gradient-to-b from-background to-muted/30 overflow-hidden"
      aria-label="Mission Control: Unified Dashboard with Connected Apps"
    >
      {/* Top border with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Background gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <DashboardScroll
        logos={connectedLogos}
        scatteredPositions={scatteredPositions}
        macbookSrc="/dashboard.png"
      />
    </section>
  );
};

export default MissionControlSectionNew;