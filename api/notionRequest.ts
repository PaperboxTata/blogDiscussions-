import axios from "axios";
const headers = {
  Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
  "Notion-Version": "2022-02-22",
}
function getDatabase() {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`, {
        headers
      })
      .then((res) => {
        resolve(res.data);
      }).catch(err => {
        reject(err)
      });
  })
}
function databaseQuery(param = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, param, {
        headers,
      })
      .then((res) => {
        resolve(res.data);
      }).catch(err => {
        reject(err)
      });
  })
}
function getPageChildren(id: string, size: number) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.notion.com/v1/blocks/${id}/children?page_size=${size}`, {
      headers
    })
      .then((res) => {
        resolve(res.data);
      }).catch(err => {
        reject(err)
      });
  })
}
function getPageData(id: string, isAdd = false) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.notion.com/v1/pages/${id}`, {
      headers
    })
      .then((res) => {
        if (isAdd)
          viewAdd1(id, res.data.properties.visitedNum.number)
        resolve(res.data);
      }).catch(err => {
        reject(err)
      })
  })
}
function viewAdd1(id: string, n: number) {
  return new Promise((resolve, reject) => {
    axios.patch(`https://api.notion.com/v1/pages/${id}`, {
      "properties": {
        "visitedNum": {
          "number": n + 1
        }
      }
    }, { headers })
  })
}
export { getDatabase, databaseQuery, getPageChildren, getPageData }