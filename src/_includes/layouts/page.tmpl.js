import TechHead from '../../_components/head/TechHead.tmpl.js'
import MetaHead from '../../_components/head/MetaHead.tmpl.js'
import OGHead from '../../_components/head/OGHead.tmpl.js'
import TwitterHead from '../../_components/head/TwitterHead.tmpl.js'

import Body from '../../_components/Body.tmpl.js'
import Article from '../../_components/Article.tmpl.js'
import PageHeader from '../../_components/PageHeader.tmpl.js'
import Prose from '../../_components/Prose.tmpl.js'

export const layout = 'layouts/base.njk'

export default ({title, description, date, subtitle, url, tags, site, time, author, content, search}) => {

    return`
    <head>
    ${TechHead({site})}
    ${MetaHead({title, description, url, tags, author})}
    ${OGHead({title, description, url, site})}
    ${TwitterHead({title, description, author})}
    </head>

    ${Body({ site, author, content: `
        ${Article({content:`
            ${PageHeader({title, subtitle})}
            ${Prose({content})}
        `})}
    `})}
`}
