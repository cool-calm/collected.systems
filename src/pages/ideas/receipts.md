---
title: Just store the receipt
description: Store less by only keeping the content’s hash
layout: ../../layouts/MainLayout.astro
---

1. Perform a calculation e.g. convert Markdown to HTML.
2. Get the HTML’s digest (e.g. SHA256).
3. Store the digest against the Markdown’s entry.
4. Throw away the generated HTML, as you can always generate it again.
