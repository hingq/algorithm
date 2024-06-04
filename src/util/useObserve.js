/**
 * 
 * @param {node}html dom
 * @param {func}callback
 */
export const useObserve = (node,func) => {
    var observerOptions = {
        childList: true, // 观察目标子节点的变化，是否有添加或者删除
        attributes: true, // 观察属性变动
        subtree: true, // 观察后代节点，默认为 false
    };
    // getPropertyValue 返回 带单位的数字的字符串，使用prasetInt() 转数字 
    const observer = new MutationObserver(func)
    observer.observe(node, observerOptions)
}