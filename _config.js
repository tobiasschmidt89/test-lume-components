import lume from "lume/mod.ts"
import date from 'lume/plugins/date.ts'
import svgo from 'lume/plugins/svgo.ts'
import inline from 'lume/plugins/inline.ts'
import postcss from 'lume/plugins/postcss.ts'
import slugifyUrls from 'lume/plugins/slugify_urls.ts'
import codeHighlight from 'lume/plugins/code_highlight.ts'

import markdown from './_markdown.js'
import preprocess from './_preprocess.js'
import process from './_process.js'
import helper from './_helper.js'
import components from './_components.js'
import componentsPlugin from './components/components.ts';

const site = JSON.parse(Deno.readTextFileSync('./src/_data/site.json'));

const generator = lume(
    {
        location: new URL('/', site.url),
        src: './src',
    },
    { markdown }
)

generator
    .use(date())
    .use(svgo())
    .use(inline())
    .use(postcss())
    .use(slugifyUrls())
    .use(codeHighlight())
    .use(componentsPlugin())

generator
    .copy('assets/fonts')
    .copy('assets/img')
    // .copy('assets/js')
    .copy('tobiasschmidt.pgp')

for (let p of preprocess) {
    generator.preprocess(p[0], p[1])
}

for (let p of process) {
    generator.process(p[0], p[1])
}

for (let h of helper) {
    generator.helper(h[0], h[1], h[2])
}

for (let c of components) {
    generator.helper(c[0], c[1], c[2])
}

export default generator
