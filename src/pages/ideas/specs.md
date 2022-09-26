---
title: Collected Specs
description: Define specification for functions using Web Assembly
layout: ../../layouts/MainLayout.astro
---

A contract that defines accepted inputs and expected outputs, and a WASM module to provide as a comparison.

So for example, if you wanted to implement your own uppercase function, you could compare your Rust implementation to the provided Wasm version.

You could also compare execution time. If it’s slower, then you probably ought to just stick to the Wasm version. You could also compare a new Wasm version to an old one, say to see if some optimisations have worked.

Passing implementations will then receive a tag connecting the implementation source (say a rust file and rust version) to the spec’s SHA. If you find you need to add an edge case that the spec missed, then you add a new spec (which will have its own sha)!

I wonder if this could also be used for validating schemas, e.g. whether a JSON or CSV file fits a schema. The validator could be a JSON scene or it could be a Turing complete Wasm file!
