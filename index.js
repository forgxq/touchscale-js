
export default function(ele, options){
    if (!ele) {
        return;
    }

    let initScale = options ? options.initScale || 1 : 1;
    let minZoom = options ? options.minZoom || 1 : 1;
    let maxZoom = options ? options.maxZoom || 5 : 5;

    let width = ele.offsetWidth;
    let height = ele.offsetHeight;
    let startLeading, endLeading;
    let zoom = 1;
    let touchStart = (e) => {
        let fingers = e.touches.length;
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];
        if (fingers === 2) {
            // 勾股定理， 计算两只手指头起始距离
            let xLeading = Math.abs(touch1.pageX - touch2.pageX);
            let yLeading = Math.abs(touch1.pageY - touch2.pageY);
            startLeading = Math.sqrt(Math.pow(xLeading, 2) + Math.pow(yLeading, 2));
        }
    };

    let touchMove = (e) => {
        let fingers = e.touches.length;
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];
        if (fingers === 2) {
            // 勾股定理， 计算两只手指头距离
            let xLeading = Math.abs(touch1.pageX - touch2.pageX);
            let yLeading = Math.abs(touch1.pageY - touch2.pageY);
            endLeading = Math.sqrt(Math.pow(xLeading, 2) + Math.pow(yLeading, 2));

            // 通过两只手指起始和终止时的距离差，计算出缩放的比例
            let moveLeading = Math.abs(endLeading - startLeading);
            // 如果距离增大，则表示放大，反之则缩小
            if (endLeading > startLeading) {
                zoom = zoom + (moveLeading / startLeading) / 2; // 除以2 减小灵明度
            } else {
                zoom = zoom - (moveLeading / startLeading) / 2;
            }

            zoom = Math.max(minZoom, Math.min(zoom, maxZoom));
            let scale = initScale * zoom;

            ele.style.transform = `scale(${scale})`;
            ele.style.width = width / zoom + 'px';
            ele.style.height = height / zoom + 'px';
        }
    };
    ele.addEventListener('touchstart', touchStart);
    ele.addEventListener('touchmove', touchMove);
};
