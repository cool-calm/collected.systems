---
title: When WebAssembly is faster
description: The overhead of the network vs the overhead of WebAssembly
layout: ../../layouts/MainLayout.astro
---

## The overhead of the network vs the overhead of WebAssembly

If I wanted to transform Markdown in HTML as fast as possible, I’d probably use a Rust or C library. We could host that library in the cloud From the time the function starts to when it exits, this will be fantastically fast.

However, what was the time to reach the server that the Rust executable runs on? Hundreds of milliseconds? If the server was close to the user it might be in the tens of milliseconds. If they are lucky.

I’d we were to do the transformation in WebAssembly, we wouldn’t hope to be as fast as a natively compiled Rust binary. (Although I’d be interested to see how close it was!)

But the WebAssembly has a big advantage — it’s portable. It can be copied and then run anywhere: on a central server, on the edge, on a user’s phone, and in the user’s browser. This means even if the runtime is slower, the latency advantage means that the overall time will be much lower. It’ll actually be quicker! It will be in the tens or even single digits of milliseconds.

And that matters for perceived performance. The user cares about getting the results not how they are made.

Things get really interesting when you think about chaining multiple operations together. Perhaps I want to transform my Markdown to HTML, syntax highlight all code snippets, and then convert that to an image. If each of these steps were handled in different microservices, then I’d have to factor in the latency between each service. Perhaps I want to use a particular third-party service for one step, and so I’ll have to use their web server which will further increase the overall time. Plus since network calls are unreliable, I’ll have to factor in the chances of the network being spotty and retries.

If everything is WebAssembly, then the relevant modules can be loaded locally, in all the same memory space. There’s no intermediate network calls or chances of failure, and no need to retry. Everything will be synchronous and work predictably.

Note: for tasks that are particularly time sensitive, you could have a local natively compiled version as an alternative to the WebAssembly. Then it will be _even_ faster. But these should be the exception.

----

## Potential API Illustrations

~~~
# Single on the edge using Wasm
# Caches
GET /edge/text/markdown/:uuid/text/html

# Multiple using Rust
POST /bulk/text/markdown/text/html
{ "body": <<uuids>> }
~~~
