/**
 * dynamic-html-to-pdf
 *
 *
 * Copyright (c) 2024 Marco Garcia
 * Licensed under the MIT license.
 */

/**
 * dynamic-html-to-pdf is used to create pdf from edge template.
 * @param {template, context, options}
 */

const { default: edge } = require('edge.js')
const { chromium } = require('playwright-chromium')

module.exports.create = async (template, context, options, defaultDisk, globals) => {
  if (!template) {
    throw 'You must provide template.'
  }
  if (!context) {
    throw 'You must provide context.'
  }

  options.printBackground = true

  try {
    // Register the views directory as the default disk for finding templates
    if (defaultDisk) {
      edge.mount(defaultDisk)
    }

    // Add global variables
    if (globals) {
      for (const global in globals) {
        edge.global(global, globals[global])
      }
    }

    // Edge template to html string
    const html = await edge.render(template, context)

    // Html string to pdf
    const browser = await chromium.launch({ chromiumSandbox: false })

    let pdf = null

    try {
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle' })
      pdf = await page.pdf(options)
    } catch(error) {
      throw error
    } finally {
      await browser.close()
    }

    return pdf

  } catch (error) {
    throw error
  }
}
