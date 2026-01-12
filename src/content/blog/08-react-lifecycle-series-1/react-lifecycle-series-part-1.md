---
title: "React Lifecycle Series: Part 1 - The Basics of React Class Component Lifecycle"
description: "Master the fundamentals of React class component lifecycle with this comprehensive guide. Learn about the mounting phase, key lifecycle methods like constructor, render, and componentDidMount, with practical examples."
date: 2024-11-24
image: "../../../assets/react-lifecycle-series-part-1.png"
slug: react-lifecycle-series-part-1
tags:
  [
    "React",
    "Web Development",
    "JavaScript",
    "Component Lifecycle",
    "Frontend Development",
    "Class Components",
  ]
updatedDate: 2024-11-24
---

### Introduction:

React class components are like living, breathing entities—they’re born (mounted), they grow (updated), and eventually, they say goodbye (unmounted). But what governs these transitions? The React lifecycle.

Here’s the quick representation of the entire lifecycle:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1732445109443/0dcedfd8-812b-46be-8ed2-73ab64341018.png)

[Reference](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

This diagram highlights each phase and the key methods associated with it. Don’t worry, we’ll break this down step by step as we go deeper into the series!

In this post, we’ll break down the foundational concepts of the React class component lifecycle, focusing on the **mounting phase**. Whether you’re debugging legacy code or understanding how modern hooks evolved, knowing this lifecycle is essential.

### **The 3 React Lifecycle Phases:**

- **Mounting:** When a component is created and added to the DOM.
- **Updating:** When the component reacts to state or prop changes.
- **Unmounting:** When the component is removed from the DOM.

### **Deep Dive into Mounting Phase:**

Let’s start with the lifecycle’s first stage—**mounting**, where the component is “born.”

- constructor(props)**:** The initialization step—set up the state and bind methods.
- render()**:** Generates the UI using JSX.
- componentDidMount()**:** React signals that your component is ready for action—perfect for fetching data, starting timers, or initializing subscriptions.

```
constructor(props) {
    super(props);
    this.state = { counter: 0 };
    console.log('Constructor called!');
}

componentDidMount() {
    console.log('Component has mounted!');
    this.timer = setInterval(() => {
        this.setState({ counter: this.state.counter + 1 });
    }, 1000);
}
```

## **Up Next in the Series:**

That’s just the beginning! The mounting phase sets the foundation, but a React component doesn’t stop there. What happens when the component’s state or props change? How do you handle updates effectively? Stay tuned for **Part 2: React Lifecycle’s Core: Updating Phase Demystified**, where we’ll dive into the most dynamic part of the lifecycle!
