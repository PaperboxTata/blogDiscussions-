function getTimeDifference(timeString: string) {
    const d = new Date().getTime() - new Date(timeString).getTime()
    if (d < 60000)
        return Math.round(d / 1000) + "秒前"
    else if (d < 3600000)
        return Math.round(d / 60000) + "分钟前"
    else if (d < 216000000)
        return Math.round(d / 3600000) + "小时前"
    else if (d < 5184000000)
        return Math.round(d / 216000000) + "天前"
    else if (d < 155520000000)
        return Math.round(d / 5184000000) + "月前"
}
export { getTimeDifference }