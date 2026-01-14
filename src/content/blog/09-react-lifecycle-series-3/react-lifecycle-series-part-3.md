---
title: "React Lifecycle Series: Part 3 - Cleaning Up: Unmounting Phase and Hooks Perspective"
description: "Complete your understanding of React lifecycle with the unmounting phase. Learn how to properly clean up resources using componentWillUnmount and modern useEffect hooks to prevent memory leaks and optimize performance."
date: 2024-11-26
image: "../../../assets/react-lifecycle-series-part-3.png"
slug: react-lifecycle-series-part-3
tags:
  [
    "React",
    "Web Development",
    "Component Lifecycle",
    "React Hooks",
    "Frontend Development",
  ]
authors:
- "Sandeep P S"
---

### **Introduction: Wrapping Things Up**

In the first two parts of this series, we explored:

- The **mounting phase**, where a component is born and added to the DOM.
- The **updating phase**, where React dynamically updates the UI based on state and props changes.

Now, we’ve reached the **unmounting phase**, the final chapter in a React class component’s lifecycle. This phase is all about **cleaning up**—ensuring your app doesn’t leave behind timers, subscriptions, or memory leaks after a component is removed from the DOM.

We’ll also compare traditional lifecycle methods like componentWillUnmount with React’s modern hooks, specifically useEffect. Let’s dive in!

### **Understanding the Unmounting Phase**

When a component is no longer needed, React removes it from the DOM. This happens when:

- The component’s parent removes it as part of rendering changes.
- You manually trigger unmounting by changing application states or routes.

The unmounting phase gives you a chance to **clean up resources** and prevent issues like memory leaks.

### **Key Lifecycle Method: componentWillUnmount()**

The componentWillUnmount method is invoked just before a component is removed from the DOM. Use it to clean up:

- **Timers** or **Intervals**
- **Event Listeners**
- **Subscriptions**
- **API Requests**

**Example:** Clearing an interval timer.

```
componentWillUnmount() {
    console.log('Component is unmounting...');
    clearInterval(this.timer);
}
```

### **Lifecycle Methods vs. Hooks (useEffect)**

Modern React simplifies lifecycle management with hooks, and useEffect is the go-to tool for handling side effects.

Here’s how to replicate componentDidMount, componentDidUpdate, and componentWillUnmount using useEffect:

```
import React, { useState, useEffect } from 'react';

function Counter() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 1000);

        // Cleanup (similar to componentWillUnmount)
        return () => clearInterval(timer);
    }, []); // Empty dependency array ensures this runs once

    return <h1>Counter: {counter}</h1>;
}

export default Counter;
```

### **Key Takeaways**

- Always clean up resources during unmounting to avoid memory leaks.
- While class components use componentWillUnmount, hooks like useEffect simplify cleanup by combining all lifecycle stages into one.

### **The Journey Ends Here!**

And that’s it—our journey through the React class component lifecycle is complete! We’ve covered everything from mounting and updating to unmounting and beyond. Whether you’re maintaining legacy code or building modern apps with hooks, these concepts will serve you well.

Have questions or feedback? Drop them in the comments below!
