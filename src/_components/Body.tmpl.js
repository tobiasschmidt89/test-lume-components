import SiteHeader from './SiteHeader.tmpl.js'
import SiteNavigation from './SiteNavigation.tmpl.js'
import SiteFooter from './SiteFooter.tmpl.js'

export default ({content, site, author}) => `
<body>
    ${SiteHeader()}
    <main id="main">
        ${content}
    </main>
    ${SiteNavigation({author})}
    ${SiteFooter({site, author})}
</body>
`

export const css = `
body {
    min-height: 100vh;
    padding: var(--frame);

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--gutter);
}

body > :not([aria-hidden="false"]) + * {
    padding-top: var(--gutter);
    border-top: var(--border);
}

main {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--gutter);
}

main > * + * {
    padding-top: var(--gutter);
    border-top: var(--border);
}
`
