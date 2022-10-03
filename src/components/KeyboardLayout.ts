function KeyboardLayout(): Subtree {
    const layout = [
        "qwertyuiop".split(""),
        "asdfghjkl".split(""),
        ["enter", ..."zxcvbnm".split(""), "⠀⠀←⠀⠀"],
    ];
    const row = (len: number) => {
        return styled("div")`
            display: grid;
            grid-template-columns: repeat(${len}, min-content);
            grid-gap: 4px;
        `;
    };

    const KeyboardContainer = styled("div")`
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    KeyboardContainer.classList.add("keyboard");

    const Key = (content: string) => {
        const span = styled("span")`
            height: 54px;
            min-width: 40px;
            padding: 8px;
            background-color: ${COLORS.gray[400]};
            border: 1px solid ${COLORS.gray[400]};
            border-radius: 4px;
            font-size: 1rem;
            font-weight: bold;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;

            transition: background-color 0.02s linear;
        `;

        span.textContent = content;
        span.setAttribute("data-key", content);

        return span;
    };

    css`
        & .pressed {
            background-color: ${COLORS.gray[500]} !important;
        }
    `("keyboard");

    return {
        p: KeyboardContainer,
        c: layout.map((el) => ({
            p: row(el.length),
            c: el.map((key) => ({
                p: Key(key),
            })),
            s: { marginBottom: "4px" },
        })),
    };
}
