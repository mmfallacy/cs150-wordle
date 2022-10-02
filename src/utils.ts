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

type SubscriberFunction<T> = (arg0: T) => void;

const useSubscribable = <T>(initialValue: T) => {
    let internalValue = initialValue;
    let callbacks: SubscriberFunction<T>[] = [];
    return {
        sub(onSub: SubscriberFunction<T>) {
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
    p: HTMLElement;
    c: Array<Subtree | undefined>;
}

HTMLElement.prototype.renderSubtree = function (tree: Subtree | undefined) {
    recursiveRenderSubtree({ p: this, c: [tree] });
};

function recursiveRenderSubtree(tree: Subtree | undefined) {
    if (!tree?.c) return;
    tree.p.replaceChildren(...tree.c.map((child) => child?.p as Node));
    tree.c.forEach((child) => recursiveRenderSubtree(child));
}
