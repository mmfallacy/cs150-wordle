function Game() {
    /** Components */
    const HiddenInput = () => {
        const input = styled("input")`
            /* visibility: hidden; */
        `;

        input.setAttributes({
            type: "text",
        });
    };
}

function KeyboardLayout() {
    const layout = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    const row = (len: number) => {
        console.log(len);
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

    const Key = (content: string) => {
        const span = styled("span")`
            height: 72px;
            width: 60px;
            background-color: ${COLORS.gray[300]};
            border: 1px solid ${COLORS.gray[400]};
            border-radius: 4px;
            font-size: 1.3rem;
            font-weight: semibold;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        span.textContent = content;

        return span;
    };

    return {
        p: KeyboardContainer,
        c: layout.map((el) => ({
            p: row(el.length),
            c: el.split("").map((key) => ({
                p: Key(key),
            })),
            s: { marginBottom: "4px" },
        })),
    };
}
