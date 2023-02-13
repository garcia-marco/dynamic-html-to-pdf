/**
 * dynamic-html-to-pdf
 *
 *
 * Copyright (c) 2023 Marco Garcia
 * Licensed under the MIT license.
 */

/**
 * dynamic-html-to-pdf is used to create pdf from edge template.
 * @param {template, context, options}
 */

const { default: edge } = require('edge.js')
const { chromium } = require("playwright-chromium")

module.exports.create = async (template, context, options) => {
  if (!template) {
    throw 'You must provide template.'
  }
  if (!context) {
    throw 'You must provide context.'
  }
  if (!options.path) {
    throw 'You must provide path to save file.'
  }

  options.printBackground = true

  try {
    // Edge template to html string
    const html = await edge.render(template, context)

    // Html string to pdf
    const browser = await chromium.launch({ chromiumSandbox: false })
    const page = await browser.newPage()
    await page.setContent(html)
    await page.pdf(options)
    await browser.close()

  } catch (error) { throw error }
}
