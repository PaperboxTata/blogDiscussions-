import axios from "axios";
const headers = {
    Authorization: `Bearer ${process.env.GITHUB_DISCUSSION_TOKEN}`,
}
async function getDiscussions(id: string) {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://giscus.app/api/discussions?repo=paperboxTata%2Fpabota%2Etop&term=${id}&category=General`)
            .then((res) => {
                resolve(res.data);
            }).catch(() => {
                resolve(null)
            })
    })
}
async function getDiscussionsLatest() {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://api.github.com/graphql`,
                { "query": "query {\trepository(name: \"blogDiscussions\", owner: \"paperboxTata\"){ discussions(last:10){ nodes { bodyText comments(last:5){ nodes{ bodyHTML createdAt author{ avatarUrl login url } replies(last:1){ nodes{ author{ avatarUrl login url } bodyHTML createdAt } } } } } } }}" },
                { headers })
            .then((res) => {
                resolve(res.data);
            }).catch(() => {
                resolve(null)
            })
    })
}
export { getDiscussions, getDiscussionsLatest }