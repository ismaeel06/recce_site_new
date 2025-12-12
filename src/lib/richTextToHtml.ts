/**
 * Converts Strapi's structured Rich Text format to HTML
 * Strapi Rich Text blocks format:
 * [
 *   { type: "paragraph", children: [{ type: "text", text: "content" }] },
 *   { type: "heading", level: 1, children: [...] }
 * ]
 */

interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: "link";
  url: string;
  children: (TextNode | LinkNode | any)[];
}

interface BlockNode {
  type: string;
  level?: number;
  children?: (TextNode | LinkNode | any)[];
  format?: string;
  text?: string;
}

function renderChildren(children: any[] = []): string {
  return children
    .map((child) => {
      if (!child) return "";

      if (child.type === "text") {
        let text = child.text || "";

        if (child.bold) text = `<strong>${text}</strong>`;
        if (child.italic) text = `<em>${text}</em>`;
        if (child.underline) text = `<u>${text}</u>`;
        if (child.strikethrough) text = `<s>${text}</s>`;
        if (child.code) text = `<code>${text}</code>`;

        return text;
      }

      if (child.type === "link") {
        return `<a href="${child.url}" target="_blank" rel="noopener noreferrer">${renderChildren(
          child.children
        )}</a>`;
      }

      return "";
    })
    .join("");
}

export function richTextToHtml(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map((block) => {
      if (!block) return "";

      const childrenHtml = renderChildren(block.children);

      switch (block.type) {
        case "paragraph":
          return `<p>${childrenHtml}</p>`;

        case "heading":
          const level = Math.min(Math.max(block.level || 2, 1), 6);
          return `<h${level}>${childrenHtml}</h${level}>`;

        case "quote":
          return `<blockquote>${childrenHtml}</blockquote>`;

        case "code":
          return `<pre><code>${childrenHtml}</code></pre>`;

        case "list":
          if (block.format === "ordered") {
            return `<ol>${childrenHtml}</ol>`;
          }
          return `<ul>${childrenHtml}</ul>`;

        case "list-item":
          return `<li>${childrenHtml}</li>`;

        case "image":
          return `<img src="${block.image?.url || ""}" alt="${block.image?.name || ""}" />`;

        case "hr":
          return "<hr />";

        default:
          return childrenHtml;
      }
    })
    .join("");
}
