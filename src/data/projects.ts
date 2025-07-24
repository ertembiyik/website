import type { TimelineItem } from '../types';

export const projects: TimelineItem[] = [
  {
    id: "bluerage-software",
    type: "project",
    title: "Bluerage Software",
    subtitle: "Me & Ilia",
    subtitleUrl: "https://www.linkedin.com/in/iamnalimov/",
    dateRange: "@March 1, 2025",
    status: "current",
    description: [
      "We started as a platform for creating MiniApps using prompts from your phone end to end. Since software creation became cheap, users that were prior not able to express their ideas now could instantly create and share them",
      "We were in close connection with <a href=\"https://www.zfellows.com/\">zfellows</a> while working on this idea",
      "We then decided to pivot from an iOS app to a Telegram bot and target an already existing Telegram MiniApps platform"
    ],
    publications: [
      {
        title: "X",
        url: "https://x.com/blueragehq"
      },
      {
        title: "Site", 
        url: "https://bluerage.software/"
      }
    ],
    skills: ["Swift", "UIKit", "SwiftUI", "Factory", "Rive", "WebKit", "Supabase", "swift-openapi", "Nuke", "PinLayout", "Observation", "mlx-swift", "Fly", "Sentry", "PostHog", "Railway", "Axiom", "Cloudflare", "Next JS", "Vercel AI SDK", "Hono"]
  },
  {
    id: "haptics-app",
    type: "project",
    title: "Haptics",
    subtitle: "Me & Ilia", 
    subtitleUrl: "https://www.linkedin.com/in/iamnalimov/",
    dateRange: "@April 1, 2024 → October 30, 2024",
    description: [
      "I developed and shipped Haptics, an iOS application that enables real-time communication between users through touch, drawings, and interactive feedback. The app was featured by the Spotted in Prod Twitter account and gained significant interest in design community.",
      "Technical: custom highly optimised CoreAnimation drawing engine, Metal based visual effects, SpriteKit scenes, single source of truth mvvm based architecture."
    ],
    publications: [
      {
        title: "AppStore",
        url: "https://apps.apple.com/us/app/haptics-send-love-to-friends/id6503260004"
      },
      {
        title: "Spotted in Prod",
        url: "https://x.com/spottedinprod/status/1847377048417030216"
      }
    ],
    skills: ["Swift", "UIKit", "SwiftUI", "swift-dependancies", "Nuke", "Firebase", "Metal", "CoreAnimation", "CoreGraphics", "SpriteKit", "PinLayout", "Yoga", "WidgetKit", "AppIntents", "StoreKit", "Combine", "Swift Structured Concurrency", "GCD"]
  },
  {
    id: "reality-app",
    type: "project",
    title: "Reality",
    subtitle: "Me & Ilia",
    subtitleUrl: "https://www.linkedin.com/in/iamnalimov/", 
    dateRange: "@October 1, 2023 → November 30, 2024",
    description: [
      "I developed and shipped Reality, an AR iOS application that enables users to place digital assets in real-world locations and discover content left by others. The app creates a persistent digital layer over the physical world through advanced geospatial AR technology",
      "Technical: ARKit + Google ARCore Geospatial API integration, RealityKit entity management system, GeoHash-based spatial querying with Firebase Firestore, VPS (Visual Positioning System) for precise world anchoring"
    ],
    publications: [
      {
        title: "AppStore",
        url: "https://apps.apple.com/us/app/reality-build-your-world/id6474273304"
      }
    ],
    skills: ["Swift", "UIKit", "swift-dependancies", "Nuke", "Firebase", "ARKit", "RealityKit", "CoreAnimation", "CoreGraphics", "PinLayout", "Yoga", "Combine", "Swift Structured Concurrency", "GCD", "CoreLocation", "AVFoundation", "ARCore", "MapKit"]
  }
];