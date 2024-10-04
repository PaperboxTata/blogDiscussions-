import { getDiscussions, getDiscussionsLatest } from "./giscusRequest"
import { databaseQuery, getPageChildren, getDatabase, getPageData } from "./notionRequest"
var recentlyPostList: any
const PostParam = (tag?: string | null) => {
    const data = {
        "filter": {
            "and":
                [{ "property": "type", "select": { "equals": "post" } },
                { "property": "state", "status": { "equals": "finished" } }]
        },
        "sorts": [{ "timestamp": "created_time", "direction": "descending" }]
    } as any
    if (tag) data.filter.and.push({ "property": "tag", "multi_select": { "contains": tag } })
    return data
}
async function getRecentlyPost() {
    if (!recentlyPostList)
        recentlyPostList = await databaseQuery({ ...PostParam(), "page_size": 4 })
    return recentlyPostList
}
async function getPostOverview(id: string) {
    const data = (await getPageChildren(id, 5)) as any
    const paragraph = data.results.find((item: any) => item.type == "paragraph")
    if (paragraph && paragraph.paragraph.rich_text[0])
        return paragraph.paragraph
    else return ""
}
async function getPageInfo(id: string) {
    const data = await getPageData(id) as any
    return data
}
var recentlyNoteList: any
const NoteParam = (tag?: string | null) => {
    const data = {
        "filter": {
            "and":
                [{ "property": "type", "select": { "equals": "note" } },
                { "property": "state", "status": { "equals": "finished" } }]
        },
        "sorts": [{ "timestamp": "created_time", "direction": "descending" }]
    } as any
    if (tag) data.filter.and.push({ "property": "series", "select": { "equals": tag } })
    return data
}
async function getRecentlyNote() {
    if (!recentlyNoteList)
        recentlyNoteList = await databaseQuery({ ...NoteParam(), "page_size": 4 })
    return recentlyNoteList
}
var databaseInfo: any
async function getDatabaseInfo() {
    if (!databaseInfo)
        databaseInfo = await getDatabase()
    return databaseInfo
}
async function getPaginationPost(page_size: number, start_cursor?: any, tag?: string | null) {
    if (start_cursor)
        return await databaseQuery({ ...PostParam(tag), page_size, start_cursor })
    else
        return await databaseQuery({ ...PostParam(tag), page_size })
}
async function getPaginationNote(page_size: number, start_cursor?: any,tag?: string | null) {
    if (start_cursor)
        return await databaseQuery({ ...NoteParam(tag), page_size, start_cursor })
    else
        return await databaseQuery({ ...NoteParam(tag), page_size })
}
async function getDiscussionsCount(id: string) {
    const data = (await getDiscussions(id) as any)
    if (data)
        return data.discussion.totalCommentCount + data.discussion.totalReplyCount
    else return "0"
}
async function getRecentlyDiscussions() {
    const data = (await getDiscussionsLatest() as any).data.repository.discussions.nodes
    let list = [] as any[]
    data.forEach((discussion: any) => {
        var comments = discussion.comments.nodes
        let commentList = [] as any[]
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].replies.nodes.length > 0) commentList.push(comments[i].replies.nodes[0])
            commentList.push(comments[i])
        }
        commentList = commentList.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        list.push({
            type: discussion.bodyText.split("/")[3],
            id: discussion.bodyText.split("\n")[0],
            bodyHTML: commentList[0].bodyHTML,
            author: commentList[0].author,
            createdAt: new Date(commentList[0].createdAt).getTime(),
        })
    });
    list = list.sort((a, b) => {
        return b - a
    })
    return list
}
export {
    getRecentlyPost, getRecentlyNote, getPostOverview,
    getDatabaseInfo, getPaginationPost, getPageInfo,
    getPaginationNote,
    getDiscussionsCount, getRecentlyDiscussions
}