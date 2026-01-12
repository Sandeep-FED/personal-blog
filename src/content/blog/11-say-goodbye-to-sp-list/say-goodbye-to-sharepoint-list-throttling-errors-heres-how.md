---
title: "Say Goodbye to SharePoint List Throttling Errors: Here\u2019s How!"
description: "Learn how to overcome SharePoint's 5,000-item list threshold using SPFx and PnPjs. This guide demonstrates batch fetching techniques to manage large lists without throttling errors."
date: 2024-12-11
image: "../../../assets/say-goodbye-to-sharepoint-list-throttling-errors-heres-how.png"
slug: say-goodbye-to-sharepoint-list-throttling-errors-heres-how
tags:
  ["SharePoint", "SPFx", "PnPjs", "Performance Optimization", "React", "M365"]
---

**Struggling with SharePoint’s 5,000-item list threshold? Don’t worry—you’re not alone. In this post, I’ll show you how to tackle this issue using a custom SPFx web part. Whether you’re a developer or an admin, this guide will walk you through a practical workaround to make large lists manageable.**

### **Why Does SharePoint Have a 5,000-Item Limit?**

If you’ve ever tried to work with large lists in SharePoint, you’ve likely encountered the infamous “5,000-item limit.” This limit is SharePoint’s way of maintaining performance by controlling how much data is processed during queries. While that’s good for Microsoft’s servers, it’s a headache when you’re dealing with thousands or even tens of thousands of items.

The result? Throttling. SharePoint essentially stops you from accessing or querying your list until you reduce the load. For businesses with growing datasets, this can become a serious bottleneck. But don’t worry—there’s a way to work around it.

### **The SPFx Web Part Solution**

Here’s the good news: using SharePoint Framework (SPFx), you can build a web part that fetches large datasets in smaller, manageable batches. This way, you bypass the throttling issue while keeping your app responsive and efficient.

Below, I’ll break down the code, explain how it works, and show you how to implement it in your own environment.

### **The Code: Fetching Large Lists in Batches**

Here’s a simplified version of the SPFx web part that solves the throttling problem. It uses PnP.js to fetch data from a large SharePoint list in increments of 2,000 items at a time.

```
import * as React from "react";
import { useState, useEffect } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { SPFI } from "@pnp/sp";
import { getSP } from "../utils/PnPConfig";
import { EmployeeCard } from "./EmployeeCard";
import { CardSkeletion } from "./CardSkeleton";

interface EmployeeItem {
  ID: number;
  [key: string]: any;
}

export const ReactThrottlingWorkaround = (props) => {
  const [items, setItems] = useState<EmployeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllListData = async () => {
    const sp: SPFI = getSP();
    const batchSize = 2000; // Fetch data in chunks
    let allItems: EmployeeItem[] = [];
    let skipToken = 0;
    let hasMore = true;

    try {
      while (hasMore) {
        const batch = await sp.web.lists
          .getByTitle("EmployeeData_7k_Table")
          .items.top(batchSize)
          .skip(skipToken)();

        allItems = [...allItems, ...batch];
        hasMore = batch.length === batchSize; // Stop when batch is smaller than batchSize
        skipToken += batchSize; // Move to the next batch
        console.log(`Fetched ${allItems.length} items`);
      }

      setItems(allItems);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Something went wrong!"));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllListData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Hello, {props.userDisplayName}!</h1>
      {loading ? (
        <CardSkeletion />
      ) : (
        <>
          <p>Total Items Fetched: {items.length}</p>
          <FluentProvider
            theme={webLightTheme}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            {items.map((item) => (
              <EmployeeCard data={item} key={item.ID} />
            ))}
          </FluentProvider>
        </>
      )}
    </div>
  );
};
```

**Let me break it down step by step so it’s easy to follow:**

1. **Batch Fetching:**

Instead of fetching the entire list at once (which would trigger throttling), the web part fetches the data in smaller chunks of 2,000 items.

2. **Pagination Using Skip:**

Each batch skips over the items that have already been fetched using the skip method. This ensures only the unfetched items are retrieved.

3. **Efficient State Management:**

The fetched data is stored in the items state, while a loading flag keeps the UI responsive by showing a skeleton loader during the fetch process.

4. **Error Handling:**

Any errors encountered during fetching (e.g., network issues) are caught and displayed to the user.

5. **Responsive UI:**

Using Fluent UI, the data is displayed in neat, user-friendly cards once it’s fully loaded.

### **Why Use This Approach?**

This SPFx web part offers several benefits:

- **No More Throttling:** By working within SharePoint’s limits, you can fetch thousands even tens of thousands of items without hitting the 5,000-item threshold.
- **Scalability:** Whether your list has 5,000 or 50,000 items, this solution handles it effortlessly.
- **Customizable:** You can tweak the batch size, list name, or even the way data is displayed to suit your needs.
- **User-Friendly Experience:** The combination of batching and skeleton loaders ensures users don’t face long wait times or errors.

### **Bonus Tips for Managing Large SharePoint Lists**

- **Index Your Columns:** This speeds up filtering and querying.
- **Use Views:** Create custom views that filter or group data into smaller chunks.
- **Archive Old Data:** Move older items to a separate list or library to reduce the main list size.
- **Optimize Performance:** Limit unnecessary fields in your list and use only the required ones for your web part.

### **Wrapping It Up**

The 5,000-item throttling issue doesn’t have to disrupt your workflow anymore. With this SPFx web part, you can manage large SharePoint lists effortlessly while keeping your app responsive and user-friendly.

If you found this guide helpful, why not give it a try in your environment? It’s a simple yet effective way to handle large datasets without compromising performance.
