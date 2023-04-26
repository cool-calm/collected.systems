import {
  DocumentHandlers,
  ElementHandlers,
  HTMLRewriter as RawHTMLRewriter,
  HTMLRewriterOptions as RawHTMLRewriterOptions,
} from "html-rewriter-wasm";

const encoder = new TextEncoder();
class HTMLRewriter {
  private elementHandlers: [selector: string, handlers: ElementHandlers][] = [];
  private documentHandlers: DocumentHandlers[] = [];

  constructor(private readonly options?: RawHTMLRewriterOptions) {}

  on(selector: string, handlers: ElementHandlers): this {
    this.elementHandlers.push([selector, handlers]);
    return this;
  }

  onDocument(handlers: DocumentHandlers): this {
    this.documentHandlers.push(handlers);
    return this;
  }

  transform(input: Response): Response {
    const stream = new ReadableStream<any>({
      start: async (controller) => {
        const rewriter = new RawHTMLRewriter((chunk) => {
          controller.enqueue(chunk);
        }, this.options);
        for (const [selector, handlers] of this.elementHandlers) {
          rewriter.on(selector, handlers);
        }
        for (const handlers of this.documentHandlers) {
          rewriter.onDocument(handlers);
        }

        const inputText = await input.text();
        await rewriter.write(encoder.encode(inputText));

        await rewriter.end();
        rewriter.free();
        controller.close();
      },
    });

    return new Response(stream);
  }
}

(globalThis as any).HTMLRewriter = HTMLRewriter;
