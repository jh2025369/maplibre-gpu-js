declare function click(target: HTMLElement | Window | Element): void;
declare function drag(target: HTMLElement | Window, mousedownOptions: any, mouseUpOptions: any): void;
declare function dblclick(target: HTMLElement | Window): void;
declare const events: {
    click: typeof click;
    drag: typeof drag;
    dblclick: typeof dblclick;
    keydown: (target: HTMLElement | Window, options: any) => void;
    keyup: (target: HTMLElement | Window, options: any) => void;
    keypress: (target: HTMLElement | Window, options: any) => void;
    mouseup: (target: HTMLElement | Window, options?: any) => void;
    mousedown: (target: HTMLElement | Window, options?: any) => void;
    mouseover: (target: HTMLElement | Window, options?: any) => void;
    mousemove: (target: HTMLElement | Window, options?: any) => void;
    mouseout: (target: HTMLElement | Window, options?: any) => void;
    contextmenu: (target: HTMLElement | Window, options?: any) => void;
    wheel: (target: HTMLElement | Window, options: any) => void;
    mousewheel: (target: HTMLElement | Window, options: any) => void;
    /**
     * magic deltaY value that indicates the event is from a mouse wheel (rather than a trackpad)
     */
    magicWheelZoomDelta: number;
    touchstart: (target: HTMLElement | Window, options?: any) => void;
    touchend: (target: HTMLElement | Window, options?: any) => void;
    touchmove: (target: HTMLElement | Window, options?: any) => void;
    touchcancel: (target: HTMLElement | Window, options?: any) => void;
    focus: (target: HTMLElement | Window) => void;
    blur: (target: HTMLElement | Window) => void;
};
export default events;
