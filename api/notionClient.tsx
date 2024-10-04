import { Client } from '@notionhq/client'
// import { NotionCompatAPI } from 'notion-compat'
import { NotionAPI } from 'notion-client'
// const client = new NotionCompatAPI(
//   new Client({ auth: process.env.NOTION_TOKEN })
// )
const client = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2
})
export default client