import { MessageSquare, MessagesSquare, Star, LayoutDashboard, Settings, LogOut } from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "fb",
    label: "FB Comments",
    icon: MessageSquare,
    badge: 12,
    description: "Manage Facebook page comments and replies",
    sections: [
      {
        title: "Inbox",
        items: [
          { label: "All Comments", count: 248 },
          { label: "Unread", count: 12, accent: true },
          { label: "Mentions", count: 7 },
          { label: "Hidden", count: 3 },
        ],
      },
      {
        title: "Filters",
        items: [
          { label: "High Confidence" },
          { label: "Low Confidence" },
          { label: "Needs Review" },
        ],
      },
      {
        title: "Pages",
        items: [
          { label: "Nova Official" },
          { label: "Nova Support" },
          { label: "Nova Beta" },
        ],
      },
    ],
  },
  {
    id: "conversations",
    label: "Conversations",
    icon: MessagesSquare,
    badge: 5,
    description: "Live chats and assistant transcripts",
    sections: [
      {
        title: "Channels",
        items: [
          { label: "Web Chat", count: 84 },
          { label: "Messenger", count: 32 },
          { label: "WhatsApp", count: 19 },
        ],
      },
      {
        title: "Status",
        items: [
          { label: "Active", accent: true, count: 5 },
          { label: "Pending", count: 11 },
          { label: "Closed", count: 320 },
        ],
      },
      {
        title: "Quick Tools",
        items: [
          { label: "Saved Replies" },
          { label: "Tags" },
          { label: "Export Transcripts" },
        ],
      },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: Star,
    description: "User ratings, reviews and NPS",
    sections: [
      {
        title: "Ratings",
        items: [
          { label: "5 Stars", count: 142 },
          { label: "4 Stars", count: 56 },
          { label: "3 Stars", count: 21 },
          { label: "Below 3", count: 9, accent: true },
        ],
      },
      {
        title: "Reports",
        items: [
          { label: "Weekly Summary" },
          { label: "Monthly NPS" },
          { label: "Sentiment Analysis" },
        ],
      },
    ],
  },
];

export const FOOTER_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Logout", icon: LogOut },
];
