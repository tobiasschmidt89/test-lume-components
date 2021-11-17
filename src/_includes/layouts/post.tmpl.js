import TechHead from '../../_components/head/TechHead.tmpl.js'
import MetaHead from '../../_components/head/MetaHead.tmpl.js'
import OGHead from '../../_components/head/OGHead.tmpl.js'
import TwitterHead from '../../_components/head/TwitterHead.tmpl.js'
import SchemaBlogPostingHead from '../../_components/head/SchemaBlogPostingHead.js'

import Body from '../../_components/Body.tmpl.js'
import Article from '../../_components/Article.tmpl.js'
import PostHeader from '../../_components/PostHeader.tmpl.js'
import Prose from '../../_components/Prose.tmpl.js'
import PostFooter from '../../_components/PostFooter.tmpl.js'

export const layout = 'layouts/base.njk'

export default ({title, description, date, url, image, tags, site, time, author, content, search}) => {

    const prevPost = search.previousPage(url, "post", "date=desc")
    const nextPost = search.nextPage(url, "post", "date=desc")

    const absoluteUrl = `${site.url}${url}`
    const dateTime = new Date(date)

    return`
    <head>
    ${TechHead({site})}
    ${MetaHead({title, description, url, tags, author})}
    ${OGHead({title, description, url, site, image})}
    ${TwitterHead({title, description, author, image})}
    ${SchemaBlogPostingHead({title, description, url: absoluteUrl, date: dateTime, author, site})}
    </head>

    ${Body({site, author, content: `
        ${Article({content:`
            ${PostHeader({title, date})}
            ${Prose({content})}
            ${PostFooter({prevPost, nextPost})}
        `})}
    `})}
`}
