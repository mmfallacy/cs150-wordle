function Start(): Subtree {
    const Container = styled("div")`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        flex-direction: column;
    `;

    const Input = () => {
        const input = styled("input")`
            padding: 12px;
        `;
        input.setAttributes({
            type: "text",
            placeholder: "Enter Word Source",
        });
        return input;
    };

    const Button = () => {
        const button = styled("button")`
            padding: 12px;
            background-color: green;
            border: none;
            color: white;
        `;

        button.textContent = "Generate word";
        return button;
    };

    return {
        p: Container,
        c: [{ p: Input(), s: { marginBottom: "8px" } }, { p: Button() }],
    };
}
