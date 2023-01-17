/**
 * dynamic-html-to-pdf
 *
 *
 * Copyright (c) 2022 Marco Garcia
 * Licensed under the MIT license.
 */

/**
 * dynamic-html-to-pdf is used to create pdf from edge template.
 * @param {template, context, options}
 */

const edge = require('edge.js').default
const puppeteer = require('puppeteer')

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
    // edge template to html string
    const html = await edge.render(template, context)

    // html string to pdf
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.pdf(options)
    await browser.close()

  } catch (error) { throw error }
}
