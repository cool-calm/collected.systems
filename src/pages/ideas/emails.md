---
title: Collected for sending emails
description: Send emails with confidence
layout: ../../layouts/MainLayout.astro
---

- Every email ever sent has its digest calculated e.g. we send to `alice@example.com` an HTML email with the digest `edeaaff3f1774ad2888673770c6d64097e391bc362d7d6fb34982ddf0efd18cb` on the 14th of August 2022. This is done for every single email.
- The actual contents of the email isn’t stored.
- You can re-calculate the email message and then verify that the output is the same as what was originally created.
- If you stored the digest for every single email sent to `alice@example.com`, that won’t take up anywhere near the amount of space that storing the full HTML messages would. You just need the email template and the variables that were passed in.
- You could look at all the emails your org has ever sent to `alice@example.com` to understand the messaging she is receiving, whether she gets repeated or conflicted messages or if she just receives a lot of noise.

## Benefits

- Not storing private information unnecessarily — we don’t actually store the content of the messages.
- Save on storage costs.
- Able to see the experience from any user’s point-of-view at any point in time.
