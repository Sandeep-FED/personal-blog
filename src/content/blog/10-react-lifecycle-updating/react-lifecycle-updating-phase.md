---
title: "React Lifecycle Series: Part 2 - React Lifecycle's Core: Updating Phase Demystified"
description: "Master the updating phase of React class components lifecycle. Learn how render() and componentDidUpdate() work together to handle state and props changes, with practical examples and best practices."
date: 2024-11-25
image: "../../../assets/react-lifecycle-updating-phase.png"
slug: react-lifecycle-updating-phase
tags:
  ["React", "Web Development", "Component Lifecycle", "Frontend Development"]
---

### **Introduction: Where We Left Off**

In the **first part of this series**, we explored the **mounting phase**—the “birth” of a React class component. We discussed how methods like constructor, render, and componentDidMount work together to initialize your component, fetch data, and make it visible in the DOM.

But React components are not static—they’re designed to respond to change. Whether it’s an updated state from user interactions or new props coming in from a parent component, the **updating phase** ensures that your UI always reflects the latest data.

In this article, we’ll focus on the **updating phase**, breaking down how it works, what methods come into play, and the best practices for handling updates in React class components.

### **Understanding the Updating Phase**

The updating phase is triggered whenever:

- The **state** of a component changes (via this.setState()), or
- The **props** passed to the component by its parent are updated.

This phase ensures your component reflects the most current data, keeping your UI dynamic and responsive.

**Key Lifecycle Methods in the Updating Phase**

**1. render()**

- Called every time there’s a change in state or props.
- Responsible for re-generating the UI based on the latest data.
- It must remain **pure**—don’t trigger side effects or modify the state inside render().

  ```
    render() {
        return <h1>Counter: {this.state.counter}</h1>;
    }
  ```

Whenever setState() is called, React automatically re-invokes render() to update the DOM.

**2. componentDidUpdate(prevProps, prevState)**

- Called **after** the DOM is updated to reflect changes in state or props.
- Perfect for handling **side effects** like:
- Fetching new data when props or state change.
- Triggering animations or syncing with external systems.

**Example Use Case:**

Suppose you want to log a message every time the counter value changes:

```
componentDidUpdate(prevProps, prevState) {
    if (prevState.counter !== this.state.counter) {
        console.log('Counter has updated!');
    }
}
```

❗

Always compare prevProps and prevState with the current ones before performing any logic. Without this check, you may trigger unnecessary updates or even infinite loops.

### **Example: Counter App with Updates**

Let’s combine these methods to create a simple counter app that updates every second:

```
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ counter: this.state.counter + 1 });
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.counter !== this.state.counter) {
            console.log(`Counter updated to: ${this.state.counter}`);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <h1>Counter: {this.state.counter}</h1>;
    }
}

export default Counter;
```

### **Best Practices for the Updating Phase**

1. **Minimize Unnecessary Renders**

- Use logic inside componentDidUpdate to ensure your component doesn’t perform redundant work.
- For example, compare prevProps and prevState before making API calls or running expensive operations.

2. **Optimize Performance**

- React will re-render the component whenever setState() is called—even if the state doesn’t change. Avoid unnecessary state updates to boost performance.

3. **Be Cautious with Side Effects**

- Keep render() pure and use componentDidUpdate for any side effects like API calls, animations, or logging.

4. **Consider Using React.memo**

- If your component is functional and doesn’t need to re-render unless props change, wrap it with React.memo to avoid unnecessary updates.

### **What’s Next?**

Now that you understand the **updating phase**, you’re one step closer to mastering the React class component lifecycle. But what happens when a component’s job is done? How do you clean up resources like timers or subscriptions to prevent memory leaks?

In the next article, **Part 3: Cleaning Up: Unmounting Phase and Hooks Perspective**, we’ll explore the final stage of the lifecycle—unmounting—and compare how lifecycle methods stack up against modern hooks like useEffect.

Stay tuned for the conclusion of this series!
