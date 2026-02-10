# Cafe Order CLI ☕

A Node.js CLI app that takes cafe orders and generates formatted receipts in **PDF** (using **PDFKit**).

## Features

- Interactive ordering in the terminal
- Menu validation (rejects items not in the menu)
- Calculates total price in cents and formats as euros
- Generates a receipt:
  - Creates a timestamped PDF: `receipt_<timestamp>.pdf`
- Receipt layout uses padding for simple column alignment

## Requirements

- Node.js (recommended: 18+)

## Install

```bash
npm install
```

## Usage

### Start ordering (default command)

```bash
node cafe-order.jss
```

- Type menu items (e.g., `latte`, `muffin`)
- Type `done` to finish and generate the receipt

### Show menu

```bash
node cafe-order.js menu
```

## Output

- `receipt_<timestamp>.pdf` (a new file for each receipt)

## Example receipt format

```text
Cafe Hitomi
25/01/2026 14:05

latte          €3.50
cappuccino     €4.00
muffin         €1.50

Total          €9.00
--------------------
```

## Notes

- PDF files are generated as new files each time (PDF is not designed for easy append like plain text).
- If you want perfect column alignment in PDF, use a monospace font (e.g., Courier).

## Tech Stack

- Node.js
- commander
- pdfkit
