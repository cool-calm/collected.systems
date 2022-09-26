---
title: Collected Processors
description: Process Requests, Fulfillers, and Querying
layout: ../../layouts/MainLayout.astro
---

Collected is designed to work with modern workflows and devices. Today, people work from their phones and tablets rather than their laptop or desktop computer because they are more readily available, they are lighter and have better battery, and are simpler and easier to learn.

However, they are not always as capable. Collected lets people work from their preferred device, no matter how mobile, while leveraging the speed of the cloud.

## How it works

1. Content is added to a pool. Content must be one of image or text, or other MIME types. Its contents are hashed with SHA256, and it is synced to cloud storage (S3, GCP Storage, B2, etc)
2. Process requests are made. They request body itself could use the same content storage pool as above, or via some other mechanism. Process requests are deterministic in that the same type of request to the same content should always look exactly the same. This way they are also content addressable, and therefore a system knows whether it has already processed a request or not.
3. Requests are processed with fulfillers. Content fulfillers produce new content based on the input content. Because the same request may produce different output depending on the time it is made, fulfillers can choose to add metadata such as time of request and version number. This metadata is NOT associated with the content itself, so if between different versions or times the exact same output is produced, then the outputted content is stored only once.
4. Content can be queried to allow integration with applications, other services, and back into the user’s workflow. Content can be queried based on a process request, and then best one chosen (smallest size, most recent, preferred fulfiller). Content can be queried by MIME type and attributes such as size. Metadata stores can add or index additional data to content to allow querying by arbitrary parameters, whether extracted from the intrinsic properties of the content, or as extra metadata added.

## Multi-input, multi-storage, multi-process, multi-output

- Multi-Input: input can come from a number of sources, whether a phone app, command line tool, or web app.
- Multi-Storage: we need not be too opinionated on which cloud service is preferred, so we allow multiple to be configured, between which content is synced. This allows the content processors to use the storage source they prefer. If a Lambda is required then S3 may be best, if App Engine Standard then GCP Storage, or if Cloudflare Workers then Backblaze B2. Content can be available on all, and storage services added and removed at will.
- Multi-Process: cloud services such as AWS or GCP can process content. Or a powerful mobile phone can process it. Or a laptop can process it. A request can be processed by multiple fulfillers. Once it has been processed, it is synced to all storage services and available wherever you like.
- Multi-Output: there’s no reason why a process request should produce only one output. If it makes sense for multiple outputs, then someday it should be supported.

## Process Requests

### Resize an image

Here is an example process request to resize an image to the maximum width of 1000 pixels.

```json
{
  "mediaBaseType": "image",
  "method": "image.resize",
  "params": {
    "maxWidth": 1000
  },
  "input": {
    "mediaType": "image/jpeg",
    "sha256": "391fea…"
  }
}
```

A processor subscribes to all `image` media base types with the `image.resize` method, and performs the resize to a maximum width of 1000 pixels. It produces a new image, which it encodes as `image/png`, and pushes it to a content store.

```json
{
  "request": "<object above>",
  "fulfiller": {
    "uuid": "xxx…",
    "domain": "imageresizer.com",
    "version": "…"
  },
  "produceIdentifier": "1",
  "producedContent": {
    "mediaType": "image/png",
    "sha256": "…"
  }
}
```

The content store it pushes to does not have to be the same content store it loaded the source image from. One content store might be optimised for downloading quickly, while another might be designed to robustly upload, retrying until it succeeds.

Eventually, all content stores will have the same content, and the tool that made the request will see that the request has been processed and produced new content. It will not know whether the request was processed immediately, or whether the request had already been processed previously.

## Implementations

### 1. Google Cloud: App Engine in Golang using Cloud Storage
- Supports resizing images
- Supports serving images with Storage’s CDN
- Supports Picture documents that adds metadata for images
- Supports syntax highlighting code using Syntect
- Supports tagging of images using Datastore
- May broadcast new content via PubSub

### 2. Cloudflare: Workers in TypeScript
- Supports serving cached images from other source
- Can do lightweight processing on the fly: alter SVGs, render markdown,
- Could support resizing images lazily (which makes and fulfils a deferred request in one)

### 3. AWS: Lambda in (Golang?) using S3
- Supports resizing images
- Supports serving images with Cloudfront
- Supports tagging of images (using QLDB or DynamoDB?)
