export default ({author}) => `
<nav id="site-navigation" class="site-navigation">
    <div>
        ${author.givenName}
        <a href="/profile/">About</a>
        <a href="/now/">Now</a>
    </div>
    <div>
        Connect
        <a href="mailto:${author.email}">Email</a>
        <a href="https://github.com/${author.x.social.github}">GitHub</a>
        <a href="https://www.linkedin.com/in/${author.x.social.linkedin}">LinkedIn</a>
    </div>
    <div>
        Blog
        <a href="/#post-list">Index</a>
        <a href="/subscribe/">Subscribe</a>
        <a href="/styleguide/">Styleguide</a>
    </div>
    <div>
        Site
        <a href="/about/">Colophon</a>
        <a href="/legal/">Imprint</a>
        <a href="/privacy/">Privacy</a>
    </div>

</nav>
`

export const css = `
.site-navigation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11ch, 1fr));
    gap: var(--gutter);
}

.site-navigation div * {
    display: block;
}

.site-navigation a {
    text-decoration: none;
    color: var(--link-on-canvas);
}

.site-navigation a:hover {
    color: unset;
}
`
