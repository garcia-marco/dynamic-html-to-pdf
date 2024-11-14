## dynamic-html-to-pdf

### What is dynamic-html-to-pdf ?
dynamic-html-to-pdf is a small package used to create pdf from edge template.

Edge transform edge template into html string.

Playwright transform html string into pdf file.

### Installation

```
npm install dynamic-html-to-pdf --save
```

### How to use dynamic-html-to-pdf
```javascript
const pdf = require('dynamic-html-to-pdf')

const template = '/absolute/path/to/file/template.edge'

// Context that can be used inside the views
const context = { users: [{ name: 'John Doe' }, { name: 'Jane Doe' }] }

// Playwright options (https://playwright.dev/docs/api/class-page#page-pdf)
const options = { path: './output.pdf' }

// Folder that contain views (https://edgejs.dev/docs/getting_started#mounting-disks)
const defaultDisk = '/absolute/path/to/file/'

// Function that can be used inside the views (https://edgejs.dev/docs/templates_state#globals)
const globals = { toLowerCase: (string) => string.toLowerCase() }

pdf.create(template, context, options, defaultDisk, globals)
```
Look https://playwright.dev/docs/api/class-page#page-pdf for different options.


### Create template.edge
```html
<html>

<head>
  <style>
    .page {
      position: relative;
      width: 100%;
      height: 100%;
    }
  </style>
</head>

<body>
  @each(user in users)
    <div class="page">
      {{ toLowerCase(user.name) }}
    </div>
  @endeach
</body>

</html>
```
Look https://edgejs.dev/docs/introduction for edge syntax