function Start(): Subtree {
    /** Components */
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

    /** Local instance of components */
    const apiInput = Input();
    const generateWordButton = Button();

    /** Handlers */
    const onSubmit = async () => {
        const req = new XMLHttpRequest();
        req.open("GET", apiInput.value, true);
        req.onload = generateWord;
        req.send();
    };

    const generateWord = function (this: XMLHttpRequest, evt: ProgressEvent) {
        const words = this.responseText.split("\n");
        const { word } = useGlobalStore();
        word.pub(words[Math.floor(Math.random() * words.length)]);
    };
    /** Bind Handlers */
    generateWordButton.onclick = onSubmit;

    return {
        p: Container,
        c: [
            { p: apiInput, s: { marginBottom: "8px" } },
            { p: generateWordButton },
        ],
    };
}
