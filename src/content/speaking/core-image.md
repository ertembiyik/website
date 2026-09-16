---
title: CoreImage
year: "2023"
event: VK × ITMO
summary: From CPU-bound Accelerate filters to a single-pass CoreImage and Metal pipeline
links:
  - label: YouTube
    url: https://www.youtube.com/watch?v=WytO_dmqr7s
icon: ../../assets/icons/vk.png
order: 1
---


A talk about how we went from custom Accelerate-based image filters to Metal and CoreImage at VK

Covers the migration from CPU-bound Accelerate image processing to GPU-accelerated pipelines using Metal and CoreImage: the performance bottlenecks in the original approach, the architecture of CoreImage's filter graph, and how Metal shaders integrate with the CoreImage pipeline for real-time image processing
