import PostHeader from './PostHeader.tmpl.js'

export default ({content}) => `
<article class="article">
    ${content}
</article>
`

export const css = `
.article {
    display: grid;
    grid-template-columns: var(--cols);
    gap: var(--gutter);
}

.article > * { grid-column: span 1 / -1; }

.article > header { grid-column: 1 / span 1; }

.article > footer { grid-column: 1 / -1; }
`
