// TODO: use a preprocessor to generate styles instead of passing as cssText
// This fixes the precedence over what styles to choose based on specificity
const styled =
    <T extends keyof HTMLElementTagNameMap>(target: T) =>
    (
        strings: TemplateStringsArray,
        ...expressions: any[]
    ): HTMLElementTagNameMap[T] => {
        const cssText = expressions.reduce(
            (acc: string, expression: any, index: number) =>
                acc +
                (typeof expression === "function" ? expression() : expression) +
                strings[index + 1],
            strings[0]
        );

        const element = document.createElement(target);
        element.style.cssText = cssText;
        return element;
    };

const css =
    (strings: TemplateStringsArray, ...expressions: any[]) =>
    (prefix: string) => {
        const cssText = expressions.reduce(
            (acc: string, expression: any, index: number) =>
                acc +
                (typeof expression === "function" ? expression() : expression) +
                strings[index + 1],
            strings[0]
        );

        const element = document.createElement("style");
        element.innerHTML = cssText.replaceAll("&", `.${prefix}`);

        document.head.appendChild(element);

        return element;
    };

type SubscriberFunction<T> = (arg0: T) => void;

const useSubscribable = <T>(initialValue: T) => {
    let internalValue = initialValue;
    let callbacks: SubscriberFunction<T>[] = [];
    return {
        sub(onSub: SubscriberFunction<T>, runOnSubscription?: boolean) {
            if (runOnSubscription) onSub(internalValue);
            callbacks.push(onSub);
            return {
                unsub: () => {
                    callbacks = callbacks.filter((cb) => cb != onSub);
                },
            };
        },
        pub(newValue: T) {
            internalValue = newValue;
            callbacks.map((cb) => cb(newValue));
        },
        get value() {
            return internalValue;
        },
    };
};

declare interface HTMLElement {
    setAttributes: (obj: Object) => void;
    renderSubtree: (tree: Subtree) => any;
}
HTMLElement.prototype.setAttributes = function (obj) {
    Object.entries(obj).forEach(([key, value]) =>
        this.setAttribute(key, value)
    );
};

interface Subtree {
    p: HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | HTMLElement;
    c?: Array<Subtree>;
    s?: Partial<CSSStyleDeclaration>;
}

HTMLElement.prototype.renderSubtree = function (tree: Subtree) {
    recursiveRenderSubtree({ p: this, c: [tree] });
};

function recursiveRenderSubtree(tree: Subtree) {
    if (tree.s)
        Object.entries(tree.s).map(
            ([key, value]) => (tree.p.style[key as any] = value as string)
        );
    if (!tree.c) return;
    tree.p.replaceChildren(...tree.c.map((child) => child.p as Node));
    tree.c.forEach((child) => recursiveRenderSubtree(child));
}
