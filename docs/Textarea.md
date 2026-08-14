---
category: Forms
---

# Textarea

Multi-line text field. Same label/hint/error contract as Input.

## Usage

```tsx
<Textarea label="Project brief" hint="Markdown is supported." rows={5} />
<Textarea label="Notes" autoGrow />
```

## Guidance

- `autoGrow` lets the field grow with its content instead of scrolling.
- Resizes vertically only, so it cannot break a column layout.
