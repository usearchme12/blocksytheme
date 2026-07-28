# World of Chat GreenShift Workflow

This document preserves the working rules for building World of Chat pages with GreenShift / Gutenberg blocks.

The purpose is simple: future AI assistants should not have to relearn the painful bits.

## Core Setup

- Site style: Blocksy + GreenShift / Gutenberg.
- Main content width for modern World of Chat pages: `1290px`.
- Accent colour: `var(--theme-palette-color-2, #E17335)`.
- Font: `Onest, sans-serif`.
- Do not add Google Fonts, external stylesheets, icon CDNs, external APIs, or `@import` rules.
- Final image assets should be WebP.
- Avoid SVG, inline SVG, PNG, and external stock/image URLs unless explicitly approved.

## GreenShift Block Shape

The reliable block pattern uses `greenshift-blocks/element` with matching JSON and rendered HTML.

Every block should have:

- a unique `id`
- a matching `localId`
- JSON on a single line inside the Gutenberg block comment
- rendered HTML tag matching the JSON `tag`

Correct:

```html
<!-- wp:greenshift-blocks/element {"id":"gsbp-a1b2c3d","localId":"gsbp-a1b2c3d","tag":"div","type":"text","textContent":"About World of Chat","className":"woca-title"} -->
<div class="woca-title">About World of Chat</div>
<!-- /wp:greenshift-blocks/element -->
```

Wrong:

```html
<!-- wp:greenshift-blocks/element {"id":"gsbp-a1b2c3d","localId":"gsbp-a1b2c3d","tag":"div","type":"text","textContent":"About World of Chat","className":"woca-title"} -->
<h2 class="woca-title">About World of Chat</h2>
<!-- /wp:greenshift-blocks/element -->
```

If the tag changes, change both the JSON `tag` and the rendered HTML tag.

## Containers And Text

Use `tag:"div"` for layout wrappers, grids, cards, panels, dots, and decorative CSS-only elements.

Use `type:"inner"` for wrappers that contain other blocks.

Use `type:"text"` and `textContent` for editable text elements.

Body copy can remain as `div` text blocks when that is the safest GreenShift pattern. It is visible, crawlable, and block-level. Do not break finished pages trying to turn every text block into a paragraph.

## Semantic Headings

Do not fake real article headings as styled divs.

Use:

- `h1` for the main page/post title
- `h2` for major sections
- `h3` for cards, FAQs, and subsections

Correct:

```html
<!-- wp:greenshift-blocks/element {"id":"gsbp-heading1","localId":"gsbp-heading1","tag":"h2","type":"text","textContent":"Public rooms need standards","className":"woc-section-title"} -->
<h2 class="woc-section-title">Public rooms need standards</h2>
<!-- /wp:greenshift-blocks/element -->
```

Before delivery, check heading-looking classes such as:

- `*-title`
- `*-heading`
- `*-section-title`
- `*-card-title`
- `*-h2`
- `*-h3`

If they are real content headings, they should use real heading tags.

## Buttons And Links

If a button goes somewhere, make it an anchor:

```html
<!-- wp:greenshift-blocks/element {"id":"gsbp-button1","localId":"gsbp-button1","tag":"a","type":"text","textContent":"Start Chatting","href":"https://www.worldofchat.co.uk/chat/","className":"woc-button"} -->
<a class="woc-button" href="https://www.worldofchat.co.uk/chat/">Start Chatting</a>
<!-- /wp:greenshift-blocks/element -->
```

Use a real `button` only for an actual action such as opening a modal.

Do not leave old `href="#"` placeholders on published pages unless the link is deliberately not ready.

## Style Manager

The GreenShift Style Manager dummy wrapper must stay harmless.

Good:

```html
<!-- wp:greenshift-blocks/element {"id":"gsbp-style1","localId":"gsbp-style1","type":"no","isVariation":"stylemanager","dynamicGClasses":[]} -->
<div></div>
<!-- /wp:greenshift-blocks/element -->
```

Rules:

- Do not put layout classes on the Style Manager dummy div.
- Do not put `.dark-mode` or `.light-mode` on the dummy div.
- Keep real styling inside `dynamicGClasses` or the approved GreenShift style output.
- Do not let converter output dump every CSS class onto the Style Manager wrapper.

## Blocksy Light/Dark Mode Reversal

This site has inverted colour mode selectors.

Visual light mode is triggered by:

```css
.dark-mode .your-wrapper,
[data-color-mode="dark"] .your-wrapper
```

Visual dark mode is triggered by:

```css
.light-mode .your-wrapper,
[data-color-mode="light"] .your-wrapper
```

Recommended pattern:

```css
.woc-page{
  --woc-bg-page:#050505;
  --woc-bg-card:rgba(18,20,29,.75);
  --woc-border-card:rgba(255,255,255,.08);
  --woc-text-primary:#cbd5e1;
  --woc-text-muted:#94a3b8;
}

.dark-mode .woc-page,
[data-color-mode="dark"] .woc-page{
  --woc-bg-page:#f6f3ee;
  --woc-bg-card:rgba(255,255,255,.92);
  --woc-border-card:rgba(0,0,0,.08);
  --woc-text-primary:#12141d;
  --woc-text-muted:#475569;
}

.light-mode .woc-page,
[data-color-mode="light"] .woc-page{
  --woc-bg-page:#050505;
  --woc-bg-card:rgba(18,20,29,.75);
  --woc-border-card:rgba(255,255,255,.08);
  --woc-text-primary:#cbd5e1;
  --woc-text-muted:#94a3b8;
}
```

Then use variables everywhere:

```css
.woc-page{background:var(--woc-bg-page);color:var(--woc-text-primary)}
.woc-card{background:var(--woc-bg-card);border-color:var(--woc-border-card)}
.woc-copy{color:var(--woc-text-muted)}
```

Do not add `.dark-mode` or `.light-mode` classes directly to content blocks.

## Width Rules

Use the page family the user asks for.

- Modern World of Chat designed pages and regional chat pages: `max-width:1290px`.
- Narrow post/article layouts: `max-width:1100px` only when explicitly wanted.
- If matching Bradford, About, Voice Chat, Contact, or the modern WOC design, default to `1290px`.

Unexpected width changes are a common source of broken-looking pages.

## Image Rules

- Use WebP files.
- Avoid PNG and SVG.
- Add explicit `width` and `height` attributes to reduce CLS.
- Use `loading="lazy"` for non-hero images.
- Consider `fetchpriority="high"` for above-the-fold hero images only.
- Keep generated images under about 150 KB where practical.
- Image title and alt text should describe what is visibly in the image.
- Do not keyword-stuff alt text or titles.

Good:

```text
Title: People by Bristol harbour
Alt: People talking near Bristol harbour at dusk
```

Bad:

```text
Title: Bristol Chat Rooms Free Online Bristol Chat Room
Alt: Best Bristol chat rooms online for free local Bristol and UK chat rooms
```

## Paste Workflow

GreenShift block markup must be pasted into WordPress Gutenberg Code Editor.

Workflow:

1. Open the WordPress page/post.
2. Switch to Code Editor.
3. Open the generated `.txt` block file in VS Code or another real editor tab.
4. If the file opens in a preview pane, click/open it into the actual editor first.
5. Use `Ctrl+A` then `Ctrl+C` from the real editor view.
6. Paste into Code Editor.
7. Switch back to Visual Editor.
8. Confirm List View shows GreenShift blocks, not Paragraph blocks full of code.

If block code works from VS Code but fails from another viewer, assume the viewer changed the copied text. Re-copy from the real editor tab.

## Validation Checklist

Before delivering a GreenShift page or section:

- Block opens and closes match.
- Every `id` is unique.
- Every `localId` matches its `id`.
- JSON in block comments is one line.
- Rendered HTML tags match JSON `tag`.
- Real article headings use `h1`, `h2`, and `h3`.
- Buttons that link are `a` tags with real `href` values.
- Style Manager dummy wrapper is harmless.
- No unwanted raw scripts, external fonts, external CSS, CDNs, or API calls.
- No PNG/SVG assets unless explicitly approved.
- Images have width, height, title, and accurate alt text.
- Light/dark mode selectors use the Blocksy inverted mapping.
- Max width matches the intended page family.

## Practical Rule For Existing Pages

Do not rebuild finished working pages purely to chase perfect HTML.

The priority is:

1. Keep working GreenShift blocks stable.
2. Use real headings going forward.
3. Keep content visible and block-level.
4. Avoid unnecessary nesting in new builds.
5. Only refactor old pages when editing them for another reason.
