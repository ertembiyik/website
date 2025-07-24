import type { TimelineItem } from '../types';

export const experiences: TimelineItem[] = [
  {
    id: "vk-senior-ios",
    type: "experience",
    title: "Senior iOS Engineer at Infrastructure Team",
    subtitle: "VK",
    subtitleUrl: "http://vk.com",
    dateRange: "@October 31, 2024",
    status: "current",
    description: [
      "Performance Optimization: analyzed app startup bottlenecks and implemented improvements, reducing app launch time by 8%, leading to a smoother user experience",
      "AI Integration: led the AI gitlab code review integration, created a cli coding agent to help testers write autotests"
    ],
    skills: ["Swift", "Obj-C", "UIKit", "ClickHouse", "MetricKit", "TypeScript", "Ink JS", "Vercel AI SDK", "Docker"]
  },
  {
    id: "vk-ios-infrastructure",
    type: "experience",
    title: "iOS Engineer at Infrastructure Team",
    subtitle: "VK",
    subtitleUrl: "http://vk.com",
    dateRange: "@June 1, 2024 → October 31, 2024",
    description: [
      "Design System: played a key role in developing and refining VK's design system (VKUI)",
      "Optimized image filters to speed up main feed load times by switching from Accelerate to CoreImage and streamlining the render pipeline to a single pass"
    ],
    publications: [
      {
        title: "CoreImage Tech Talk",
        url: "https://www.youtube.com/watch?v=WytO_dmqr7s"
      }
    ],
    skills: ["Swift", "Obj-C", "UIKit", "SwiftUI", "TextKit", "CoreGraphics", "CoreAnimation", "CoreImage", "Metal", "Accelerate", "XCTest", "MetricKit"]
  },
  {
    id: "vk-ios-superapp",
    type: "experience",
    title: "iOS Engineer at SuperApp Team",
    subtitle: "VK",
    subtitleUrl: "http://vk.com",
    dateRange: "@September 30, 2023 → June 1, 2024",
    description: [
      "Service's showcase: rebuilt main navigation entry point for VK App users from the ground up, creating a complex interactive collection with multiple sections, custom layout logic, realtime SSE updates, custom collection view animations",
      "Service's showcase settings: implemented widgets settings, so users can customize the showcase to their needs. Implemented custom drag-n-drop logic similar to springboard mechanic",
      "TabBar customization: this feature allows users to setup their tabbar by selecting most used tabs. Led the development of the whole feature with the most 'fun' part of disassembling UIKit to find private API's to allow more than 5 tabs on iOS devices"
    ],
    publications: [
      {
        title: "Tab Bar settings release",
        url: "https://m.vk.com/wall-35005_54964"
      }
    ],
    skills: ["Swift", "Obj-C", "UIKit", "CoreGraphics", "CoreAnimation", "Lottie", "RLottie", "Swift Structured Concurrency", "GCD", "HealthKit", "Combine", "Yoga"]
  },
  {
    id: "vk-junior-ios",
    type: "experience",
    title: "Junior iOS Engineer at SuperApp Team",
    subtitle: "VK",
    subtitleUrl: "http://vk.com",
    dateRange: "@August 8, 2022 → September 30, 2023",
    description: [
      "MiniApps platform: WebView based apps with an ability to call native code via JavaScriptCore message handlers",
      "MiniApps Catalog (MiniApps store)",
      "LiveActivities",
      "Apple Watch app",
      "MiniApps ads system"
    ],
    publications: [
      {
        title: "VK Apple Watch App release",
        url: "https://vk.com/watch"
      }
    ],
    skills: ["Swift", "Obj-C", "UIKit", "CoreGraphics", "CoreAnimation", "GCD", "HealthKit", "Combine", "ActivityKit", "WidgetKit", "WebKit", "JavaScriptCore", "WatchKit", "CoreLocation"]
  },
  {
    id: "itmo-lecturer",
    type: "experience",
    title: "Lecturer",
    subtitle: "ITMO University",
    subtitleUrl: "https://en.itmo.ru/",
    dateRange: "@September 1, 2023 → January 30, 2024",
    description: [
      "Delivered lectures on iOS development, conducted live coding sessions, and evaluated student assignments"
    ],
    publications: [
      {
        title: "Course announcement",
        url: "https://education.vk.company/program/237"
      }
    ],
    skills: []
  },
  {
    id: "sparrowcode-swift",
    type: "experience", 
    title: "Swift Engineer",
    subtitle: "Sparrowcode",
    subtitleUrl: "https://sparrowcode.io",
    dateRange: "@February 12, 2022 → August 1, 2022",
    description: [
      "Led the creation of a comprehensive Ethereum library in Swift",
      "RLP encoding/decoding, value converters, key utilities, and support for smart contracts"
    ],
    publications: [
      {
        title: "GitHub",
        url: "https://github.com/sparrowcode/swift-ethereum"
      }
    ],
    skills: ["Swift", "CryptoKit", "XCTest", "Swift Structured Concurrency", "GCD"]
  },
  {
    id: "kultura-ios",
    type: "experience",
    title: "iOS Developer", 
    subtitle: "Kultura Records Store",
    subtitleUrl: "https://kulturarecordstore.ru/",
    dateRange: "@February 12, 2022 → August 1, 2022",
    description: [
      "Developed an app enabling users to scan item barcodes to preview vinyl/cassette content, reducing employee workload by 1-3 hours daily"
    ],
    publications: [
      {
        title: "AppStore",
        url: "https://apps.apple.com/us/app/kultura/id1591618437"
      }
    ],
    skills: ["Swift", "UIKit", "SwiftUI", "TCA", "Combine", "Swift Structured Concurrency", "swift-dependancies", "AVFoundation", "CoreData"]
  }
];