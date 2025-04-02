import Point from '@mapbox/point-geometry';
export declare class DOM {
    private static readonly docStyle;
    private static userSelect;
    private static selectProp;
    private static transformProp;
    private static testProp;
    static create<K extends keyof HTMLElementTagNameMap>(tagName: K, className?: string, container?: HTMLElement): HTMLElementTagNameMap[K];
    static createNS(namespaceURI: string, tagName: string): Element;
    static disableDrag(): void;
    static enableDrag(): void;
    static setTransform(el: HTMLElement, value: string): void;
    static addEventListener(target: HTMLElement | Window | Document, type: string, callback: EventListenerOrEventListenerObject, options?: {
        passive?: boolean;
        capture?: boolean;
    }): void;
    static removeEventListener(target: HTMLElement | Window | Document, type: string, callback: EventListenerOrEventListenerObject, options?: {
        passive?: boolean;
        capture?: boolean;
    }): void;
    private static suppressClickInternal;
    static suppressClick(): void;
    private static getScale;
    private static getPoint;
    static mousePos(el: HTMLElement, e: MouseEvent | Touch): Point;
    static touchPos(el: HTMLElement, touches: TouchList): Point[];
    static mouseButton(e: MouseEvent): number;
    static remove(node: HTMLElement): void;
}
