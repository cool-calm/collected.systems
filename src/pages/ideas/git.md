---
title: Collected works with what you already have
description: Compose simple machines into a larger system
layout: ../../layouts/MainLayout.astro
---

```bash
# Pull the latest changes down on this branch
git pull
# Ensure anything new is collected
collected up
# Copy the public URL for the same content at this file path
collected url assets/logo.png | pbcopy
```

Instead of adding a file-like paradigm, Collected works with your existing file systems. If you use Git, then you can cd into a repo and upload to your Collected nest and then refer to Collected content by the local file name.

Running `collected url assets/logo.png` does the following steps:

1. Calculates the digest for the file at `assets/logo.png`
2. Put together the content ID including the SHA, mime type and byte count.
3. Construct a URL with the content ID and the current Collected origin. This could be say a URL to a S3 object.

A `.collected` file is used to configure where things are stored e.g. which s3 bucket, gcp datastore account, etc

## Allowed to transform but not to upload

One interesting aspect of Collected is that you can have different levels of permissions, and those permissions might allow you to transform a piece of content while preventing you from uploading.

This could allow you to say convert a piece of Markdown to HTML, but not add new pieces of Markdown to the nest.

Or could you extract out a code snippet from a lengthy Markdown document, and syntax highlight it. Or even evaluate the code. The system could assume any code that has been added is also known to be safe to execute. (Of course, you can never take security for granted)

```console
> collected url assets/logo.png
https://…

> collected url new-file.png
This file is not part of the nest. You do not have permission to upload content.
```
