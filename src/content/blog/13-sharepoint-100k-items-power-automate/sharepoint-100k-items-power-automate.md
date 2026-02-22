---
title: "How to Get More Than 1 Lakh Items from a SharePoint List in Power Automate"
description: "Hitting the SharePoint Get Items limit? Learn how to work around the 1 lakh (100,000) item threshold in Power Automate using pagination and the right connector settings."
date: 2026-02-22
image: "../../../assets/sharepoint-100k-items-power-automate.png"
slug: sharepoint-100k-items-power-automate
tags:
  [
    "Power Automate",
    "Power Platform",
    "SharePoint",
  ]
updatedDate: 2026-02-22
authors:
- "Sandeep P S"
---

A few days ago, I was working on a project where I needed to pull SharePoint list items for an external system using Power Automate.

The external team couldn't get the data through the Snowflake connector.

The SharePoint list had more than 100,000 items.

I tried the SharePoint **Get Items** connector first.

It didn't work.

So let me skip straight to what actually does — and how to get more than 100k records from a SharePoint list without losing your mind.

---

## Why This Is Even a Problem

SharePoint has a 5,000 item list view threshold limit.

This isn't just a Power Automate problem. It affects Power Apps, SPFx, and anything else that queries a SharePoint list. You have to handle it correctly — or you're going nowhere.

---

## The Gotcha With "Get Items" (SharePoint Connector)

Before we go further, here's what you need to know about the **Get Items** action:

- By default, it returns only **100 items**.
- You can increase that to **5,000** in the action parameters top property.
- For anything over 5k, you need to enable **pagination** — also from the action settings.
- The maximum pagination threshold? **100,000 items.**

That's the hard ceiling. If your list has more than 100k records, this connector won't cut it.

[Screenshot]

---

## The Fix: SharePoint REST API (Standard Connector)

The answer is the **SharePoint REST API** using the standard HTTP connector.

Unlike the Get Items action, this connector doesn't have a pagination setting you configure in the UI. Instead, it handles pagination through something called the `__next` link — a URL returned in each response that points to the next page of results.

Here's how to build the flow, step by step.

---

## Step-by-Step: Getting 100k+ Items from SharePoint

### Step 1 — Initialize a Variable for the REST API URI

Create a variable called `vSharePointUri` and set the initial value to:

```
_api/web/lists/GetByTitle('List_Name')/items?$top=3000&$orderby=ID
```

The `$top` parameter controls how many items you get per page. The maximum is **5,000**. I used 3,000 here — adjust based on your needs.

If your list has 200,000 items and you set `$top=3000`, you'll get 3,000 items per page and the loop will run until it's pulled everything.

[Screenshot]

---

### Step 2 — Add a "Do Until" Action

This loop keeps running until the `__next` link is empty — which means there are no more items left to fetch.

In the loop parameters, set **Loop Until** to:

```
@equals(@{empty(variables('vSharePointUri'))},true)
```

**Two things to watch here:**

1. By default, Do Until runs a maximum of **60 iterations**. You can increase this to **200** in the action settings.
2. Set the **Timeout** properly. If your list is large and the loop runs for a long time without a timeout configured, the flow can break mid-run.

[Screenshot]

---

### Step 3 — Add "Send an HTTP Request to SharePoint"

Inside the loop, add this action.

- **Site Address**: your SharePoint site
- **Method**: GET
- **URI**: the `vSharePointUri` variable

Click on **Advanced Parameters** and add this header:

| Key | Value |
|---|---|
| Accept | application/json;odata=verbose |

[Screenshot]

---

### Step 4 — Add a "Parse JSON" Action (Optional)

This step is optional — but if your external system expects JSON, it's the cleanest way to handle the data.

Pass the **body** of the SharePoint REST API response as the content. Use this schema to get started:

```json
{
  "type": "object",
  "properties": {
    "d": {
      "type": "object",
      "properties": {
        "results": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "__next": {
          "type": "string"
        }
      }
    }
  }
}
```

---

### Step 5 — Set the Variable to the Next Link

This is the critical step that keeps the loop moving.

At the end of each iteration, add a **Set Variable** action to update `vSharePointUri` with the next page link from the response:

```
if(empty(body('Parse_JSON')?['d']?['__next']),'',replace(body('Parse_JSON')?['d']?['__next'],'https://contoso.sharepoint.com/sites/ContosoIT/',''))
```

When there are no more pages, `__next` is empty — the variable gets set to empty — and the Do Until loop exits.

---

## You're Done

That's the entire flow.

Depending on what your external system needs, you can add a **Create File** action at the end so it can process the records from a file location instead of consuming the API response directly.

The SharePoint Get Items connector has a 100k ceiling. The REST API approach doesn't. Now you know how to use it.

Stop fighting the threshold. Work around it.