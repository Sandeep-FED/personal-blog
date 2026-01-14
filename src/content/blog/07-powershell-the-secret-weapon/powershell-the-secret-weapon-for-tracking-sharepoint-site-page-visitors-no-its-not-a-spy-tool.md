---
title: "PowerShell: The Secret Weapon for Tracking SharePoint Site Page Visitors (No,It's Not a Spy Tool!)"
description: "Unlock the power of PowerShell to track SharePoint site page visitors effortlessly. Learn how to fetch visitor data from audit logs and store it in SharePoint lists for insightful analytics."
date: 2024-12-25
image: "../../../assets/powershell-track-sharepoint-site-page-visitors.png"
slug: powershell-the-secret-weapon-for-tracking-sharepoint-site-page-visitors-no-its-not-a-spy-tool
tags: ["PowerShell", "SharePoint", "Analytics", "Automation"]
authors:
- "Sandeep P S"
---

Hello SharePoint aficionados! 👋

As SharePoint admins, developers, or even super-users (we all know who you are), you might be wondering how to get your hands on detailed insights about how people are interacting with your SharePoint site. Well, don’t worry, I’ve got you covered.

You’re probably familiar with the usual ways of checking site stats, but what if I told you there’s a better, faster, and smarter way to **automatically** track page views using **PowerShell**? 🤯

In this post, we’re going to use PowerShell to fetch site visitor data and store it in a SharePoint list. But we won’t just stop there—we’ll **extend** the power of this script to make your life even easier with some automation magic and even a custom SharePoint web part for analytics.

So, grab your coffee (or tea, I’m not judging) and let’s break it down.

### **What’s All the Fuss About Tracking Visitors Anyway?**

Let’s be honest, tracking site visitors isn’t just a **“nice-to-have.”** It’s a **must-have.**

Why?

Because **knowledge is power**! Whether you’re a SharePoint admin trying to keep things running smoothly, a developer looking to optimize site performance, or a user who’s curious about who’s browsing what—understanding how and when people engage with your site can make all the difference.

But how do you get these juicy insights without breaking a sweat?

Well, enter PowerShell. With a little scripting magic, we can pull audit logs, track page views, and store that valuable info in a SharePoint list, all in a matter of minutes.

### **Let’s Dive In: The PowerShell Script You’ve Been Waiting For**

Here’s the heart of the solution. The script does two main things:

1. **Fetches the page view data** from Microsoft 365 audit logs.

2. **Stores that data in a SharePoint list** for easy reporting.

Now, before you run this, make sure you have the necessary permissions and modules installed. Don’t worry—I’ll guide you through it.

Here’s the script you’ll be using:

```
try {
    # Configurations
    $siteUrl = "https://contoso.sharepoint.com/sites/DemoSite"  # SharePoint site URL
    $listName = "AuditLog"                                      # List name
    $startDate = (Get-Date).AddDays(-90)                        # Fetch data from the past 90 days
    $endDate = (Get-Date)                                       # Until today
    $clientId = "your-app-client-id"

    # Authentication to Exchange Online
    Connect-ExchangeOnline -UserPrincipalName "admin@contoso.onmicrosoft.com"

    # Fetch Audit Data
    $auditRecords = Search-UnifiedAuditLog -StartDate $startDate -EndDate $endDate -Operations "PageViewed" -SiteIds "your-site-id"

    if ($auditRecords) {
        # Connect to SharePoint
        Connect-PnPOnline -Url $siteUrl -ClientId $clientId -Interactive

        # Add Records to List
        foreach ($record in $auditRecords) {
            Add-PnPListItem -List $listName -Values @{
                "User"      = $record.UserIds
                "Timestamp" = $record.CreationDate
                "Action"    = $record.Operations
            }
        }
        Write-Host "Audit data successfully added to the SharePoint list."
        Disconnect-PnPOnline
    } else {
        Write-Host "No records found for the specified date range."
    }
} catch {
    Write-Error "An error occurred: $_"
} finally {
    Disconnect-ExchangeOnline -Confirm:$false
}
```

### **Step-by-Step Breakdown:**

**1. Set Up Your Script**

You know the drill: configure your environment first. Set the URL of your SharePoint site, choose the list where the visitor details will go, and define your date range.

```
$siteUrl = "https://contoso.sharepoint.com/sites/DemoSite"  # Your SharePoint site URL
$listName = "AuditLog"                                      # Your SharePoint list for storing data
$startDate = (Get-Date).AddDays(-90)                        # Start date (90 days ago)
$endDate = (Get-Date)                                       # End date (today)
```

**2. Authentication: Magic Behind the Scenes**

Here’s where the script connects to **Exchange Online** for fetching audit data and **SharePoint Online** to add that data into your list.

The first step: Authentication to **Exchange Online**. Use this cmdlet to connect (you can find all the details in this [official guide](https://learn.microsoft.com/en-us/powershell/exchange/connect-to-exchange-online-powershell?view=exchange-ps)).

```
Connect-ExchangeOnline -UserPrincipalName "admin@contoso.onmicrosoft.com"
```

Then, we authenticate to **SharePoint** using PnP PowerShell (if you haven’t set this up, here’s the [authentication guide for SharePoint](https://pnp.github.io/powershell/articles/authentication.html)):

```
Connect-PnPOnline -Url $siteUrl -ClientId $clientId -Interactive
```

**3. Fetch Those Logs**

This part is where the real action happens! We fetch the audit logs using the Search-UnifiedAuditLog cmdlet. Specifically, we’re interested in **PageViewed** events, so only page views are pulled into the report.

```
$auditRecords = Search-UnifiedAuditLog -StartDate $startDate -EndDate $endDate -Operations "PageViewed" -SiteIds "your-site-id"
```

**4. Push the Data to SharePoint**

Once the audit records are fetched, the next step is adding them to a SharePoint list. Simple, right?

```
foreach ($record in $auditRecords) {
    Add-PnPListItem -List $listName -Values @{
        "User"      = $record.UserIds
        "Timestamp" = $record.CreationDate
        "Action"    = $record.Operations
    }
}
```

Voila! Your SharePoint list is now packed with valuable visitor insights. 🎉

**5. Clean Up**

The script takes care of disconnecting from both Exchange and SharePoint once the data is processed, so you can just relax and let the script do the heavy lifting.

```
Disconnect-ExchangeOnline -Confirm:$false
```

### **Take It a Step Further: Add Cool Analytics with a Custom Web Part**

Why stop at just tracking the data? Why not create a custom SharePoint web part that shows your site’s visitor analytics in real-time? 📊

Using the data stored in your SharePoint list, you could:

- Build an interactive dashboard showing page views, active users, and popular content.
- Use **Power BI** for advanced reporting and visualization of your SharePoint usage data.
- Display site engagement trends in a visually appealing way using SharePoint web parts or Power Apps.

This is the fun part—put your creative hat on!

---

### **Automate It with Azure Automation 🔧**

Automation is the key to efficiency, right? This entire process can be scheduled to run on a regular basis using **Azure Automation**. Imagine having the script fetch new audit data and populate your SharePoint list daily, weekly, or monthly—**without you lifting a finger**. 🙌

Here’s how you can set it up:

- Create an **Azure Automation account**.
- Upload the script as a **runbook**.
- Schedule the runbook to execute periodically.
- Leverage **managed identities** for seamless authentication, so no credentials are needed!

With this setup, your visitor tracking becomes fully automated and always up-to-date.

### **Wrapping It Up: Why PowerShell Rocks for SharePoint Analytics**

There you have it, folks! In just a few steps, you’ve learned how to pull valuable visitor data from audit logs and store it in SharePoint, automate the entire process, and even display those insights using custom web parts or Power BI.

PowerShell is more than just a tool—it’s your trusty sidekick for automating SharePoint tasks. And as an admin or developer, you can’t go wrong with having more visibility into how users interact with your site.

Now, go ahead—run the script, schedule it in Azure Automation, and start making your SharePoint experience **even smarter**! 🚀

💡

**Pro Tip**: Want to make your custom web part even cooler? Integrate it with Power BI to create interactive visualizations, or use modern SharePoint list formatting to turn your visitor data into a dynamic, user-friendly report. The possibilities are endless!

Now it’s your turn—go ahead and track those visitors. And, as always, let me know how it works for you or if you have any tips of your own! Happy tracking! 🎯
