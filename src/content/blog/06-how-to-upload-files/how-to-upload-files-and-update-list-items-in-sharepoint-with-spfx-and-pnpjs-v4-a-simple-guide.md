---
title:
  "How to Upload Files and Update List Items in SharePoint with SPFx and PnPJS
  v4: A Simple Guide"
description: "A comprehensive guide on uploading files and updating list items in SharePoint using SPFx and PnPjs, including best practices and code examples."
date: 2025-03-31
image: "../../../assets/how-to-upload-files-and-update-list-items-in-sharepoint-with-spfx-and-pnpjs-v4-a-simple-guide.png"
tags: ["SharePoint", "M365 Community", "M365", "SPFx", "React"]
slug: how-to-upload-files-and-update-list-items-in-sharepoint-with-spfx-and-pnpjs-v4-a-simple-guide
updatedDate: 2025-03-31
---

## Quick Intro

For SharePoint solutions, storing files and their metadata is always necessary. Therefore, we use the SharePoint Document Library to store files and their metadata. Performing this task through the SharePoint UX is much easier. However, when you build an SPFx application with file upload and metadata-storing capabilities, you should know how to upload files and update list items in SharePoint. This blog covers all of these aspects.

## Prerequisites:

Before starting with the implementation, ensure you have the following prerequisites:

- An SPFx Project
- PnPjs v4 installed & configured

## How to upload files to the folders in document library?

1. **_Ensure Folder Existence:_** Before uploading any files to the folders inside the document library, it is always good practice to check whether a folder exists or not.

   - I have a function that checks for the existence of a folder by using the folder path.
   - If the folder **doesn’t** exist, I have **another** function that creates the folder.

```
    // Make sure you have the folder available before uploading files
    export const ensureFolder = async (uploadPath: string) => {
      let sp: SPFI = getSP()
      const folder = await sp.web
        .getFolderByServerRelativePath(uploadPath)
        .select("Exists")()

    // Calls createFolder if the folder doesn't exists
      if (!folder.Exists) {
        await createFolder(uploadPath)
      }
    }

    // Function to create folder
    export const createFolder = async (folderPath: any) => {
      let sp: SPFI = getSP()

      // creates a new folder for web with specified server relative url
      await sp.web.folders.addUsingPath(folderPath)
    }
```

2. **_Create a for loop._** Since we are uploading multiple files, we need to iterate over each **file** and upload it.

   ```
    for (const file of files) {
        try {
          const fileNamePath = encodeURI(file.name)
          let result: any

          if (file.size <= 10485760) {
            // 3. Small upload (less than 10MB)
            await sp.web
              .getFolderByServerRelativePath(basePath)
              .files.addUsingPath(fileNamePath, file, { Overwrite: true })
          } else {
            // 4. Large upload (greater than 10MB)
            await sp.web
              .getFolderByServerRelativePath(basePath)
              .files.addChunked(fileNamePath, file, {
                progress: (data) => {
                  console.log(`Upload progress: ${data}%`)
                },
                Overwrite: true,
              })
          }
    }
   ```

   1. if condition checking file size, cause uploading larger files in straight isn’t ideal. So file size less than 10mb we use **addUsingPath()** method otherwise **addChunked().**

💡

Use of encodeURI() - When dealing with file or folder names containing special characters (spaces, #, %, &, etc.), SharePoint paths require encoding to ensure they are correctly interpreted by the API.

**PnPjs** provides two methods for file uploads: addUsingPath() and addChunked().

- **addUsingPath()** – Ideal for uploading smaller files. It supports file names containing percent (%) or pound (#) characters.
- **addChunked()** – Ideal for uploading larger files, as it uses a chunking method to upload the file in smaller parts. Internally, it uses three methods:

  1. It starts with addUsingPath() to add the file metadata without uploading the actual file (the file length remains 0 initially).
  2. Then, it internally calls startUpload() → continueUpload() → finishUpload().
  3. After finishUpload() is called, the file length is updated in the response.

💡

The **addChunked()** method provides a third argument, which is a **progress callback**. This can be used to create a file upload progress bar for better UX.

3. Now the final code looks like below:

   ```
    import { getSP } from "../utils/spUtility"
    import { SPFI } from "@pnp/sp"

    // Make sure you have the folder available before uploading files
    export const ensureFolder = async (uploadPath: string) => {
      let sp: SPFI = getSP()
      const folder = await sp.web
        .getFolderByServerRelativePath(uploadPath)
        .select("Exists")()

    // Calls createFolder if the folder doesn't exists
      if (!folder.Exists) {
        await createFolder(uploadPath)
      }
    }

    // Function to create folder
    export const createFolder = async (folderPath: any) => {
      let sp: SPFI = getSP()

      // creates a new folder for web with specified server relative url
      await sp.web.folders.addUsingPath(folderPath)
    }

    export const uploadFiles = async (
      files: File[],
      pageContext: any,
      category: string
    ) => {
      let sp: SPFI = getSP()
      let results: any[] = []

      // Create base path for uploads
      let basePath = `${pageContext._site.serverRelativeUrl}/Documents/dummyFolder`

      // 1. Ensure folder exists
      await ensureFolder(basePath)

      // 2. Process each file
      for (const file of files) {
        try {
          const fileNamePath = encodeURI(file.name)

          if (file.size <= 10485760) {
            // 3. Small upload (less than 10MB)
            await sp.web
              .getFolderByServerRelativePath(basePath)
              .files.addUsingPath(fileNamePath, file, { Overwrite: true })
          } else {
            // 4. Large upload (greater than 10MB)
            await sp.web
              .getFolderByServerRelativePath(basePath)
              .files.addChunked(fileNamePath, file, {
                progress: (data) => {
                  console.log(`Upload progress: ${data}%`)
                },
                Overwrite: true,
              })
          }
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error)
        }
      }

      return results
    }
   ```

Now that you understand how to upload files efficiently to a SharePoint document library, let’s move on to updating items after the file upload.

## **Updating Metadata After File Upload**

To update the metadata or additional properties of files after uploading them, we use the getFileByServerRelativePath() method. This method takes the server-relative URL of the file **(from the response of the file upload)**, retrieves the item, and allows us to update the metadata.

Lets see it in action:

```
let fileInfo = await sp.web.getFileByServerRelativePath(result.ServerRelativeUrl).getItem()

await fileInfo.update({
 Category: category;
})
```

Here’s is the final code:

```
import { getSP } from "../utils/spUtility"
import { SPFI } from "@pnp/sp"

// Make sure you have the folder available before uploading files
export const ensureFolder = async (uploadPath: string) => {
  let sp: SPFI = getSP()
  const folder = await sp.web
    .getFolderByServerRelativePath(uploadPath)
    .select("Exists")()

// Calls createFolder if the folder doesn't exists
  if (!folder.Exists) {
    await createFolder(uploadPath)
  }
}

// Function to create folder
export const createFolder = async (folderPath: any) => {
  let sp: SPFI = getSP()

  // creates a new folder for web with specified server relative url
  await sp.web.folders.addUsingPath(folderPath)
}

export const uploadFiles = async (
  files: File[],
  pageContext: any,
  category: string
) => {
  let sp: SPFI = getSP()
  let results: any[] = []

  // Create base path for uploads
  let basePath = `${pageContext._site.serverRelativeUrl}/Documents/dummyFolder`

  // 1. Ensure folder exists
  await ensureFolder(basePath)

  // 2. Process each file
  for (const file of files) {
    try {
      const fileNamePath = encodeURI(file.name)
      let result: any

      if (file.size <= 10485760) {
        // 3. Small upload (less than 10MB)
        result = await sp.web
          .getFolderByServerRelativePath(basePath)
          .files.addUsingPath(fileNamePath, file, { Overwrite: true })
      } else {
        // 4. Large upload (greater than 10MB)
        result = await sp.web
          .getFolderByServerRelativePath(basePath)
          .files.addChunked(fileNamePath, file, {
            progress: (data) => {
              console.log(`Upload progress: ${data}%`)
            },
            Overwrite: true,
          })
      }
      let fileInfo = await sp.web.getFileByServerRelativePath(result.ServerRelativeUrl).getItem()

      await fileInfo.update({
         Category: category;
      })
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error)
    }
  }
  return results
}
```

## Conclusion

With this blog, we have learned how to upload files and update their metadata in a SharePoint document library using **SPFx** and **PnPjs**. We have also explored some good practices to use & how the addUsingPath() and addChunked() methods work, including the behind-the-scenes process.

Happy Coding 🚀
