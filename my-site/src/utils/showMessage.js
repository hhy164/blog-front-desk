import getCompRootDom from "./getCompRootDom";
import Icon from "../components/Icon";
import styles from "./showMessage.module.less";
/**
 * 弹出消息
 * @param {弹出的消息内容String} content "成功"或"失败"
 * @param {消息类型String} type success error info warn 
 * @param {这个弹框放在哪个元素内HTMLElement} container  消息会显示到该容器正中，如果不传，消息会显示在页面正中
 * @param {Number} duration表示弹框消息时间，默认为2秒后消失 
 */
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 100;
    const container = options.container || document.body;
    // 创建消息元素
    const div = document.createElement('div');
    const iconDom = getCompRootDom(Icon, {
        type
    });
    div.innerHTML = `<span class="${styles.icon}">
        ${iconDom.outerHTML}  
    </span>
    <div>
        ${content}
    </div>
    `
    // 设置样式
    const typeClassName = styles[`message-${type}`]; //类型样式名
    div.className = `${styles.message} ${typeClassName} `;

    // 有容器就要在容器内居中，容器需要相对定位，弹框要绝对定位
    // 容器的position是否改动过
    if (options.container) {
        // 如果传了container,才设置相对定位
        //如果没传在body内就不需要设置body为relative
        if (getComputedStyle(container).position === "static") {
            // 如果是静态的，那么设置咱们的position为relative
            container.style.position = "relative";
        }
    }
    container.appendChild(div);
    // 浏览器强行渲染
    div.clientHeight; //读取这个就会导致reflow

    // 回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;
    // 等一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-15px)`;
        div, addEventListener("transitionend", function () {
            div.remove();
            // 运行回调函数
            options.callback && options.callback();

        }, { once: true });
        // once:true表示事件只触发一次
    }, duration)
}