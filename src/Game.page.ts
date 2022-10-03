function Game(): Subtree {
    /** Components */
    const HiddenInput = () => {
        const input = styled("input")`
            visibility: hidden;
        `;

        input.setAttributes({
            type: "text",
        });
        return input;
    };

    const keyboardInput = HiddenInput();

    const keyboard = KeyboardLayout();

    const Container = styled("div")``;

    const onKeydown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        // Pass keyboard event onto the input field
        if (key === "backspace")
            // Remove last character
            keyboardInput.value = keyboardInput.value.substring(
                0,
                keyboardInput.value.length - 1
            );
        else if (key === "enter")
            // Detect Enters
            console.log("Entered");
        else if (/^[a-z]$/.test(key))
            // Append alphanumeric key
            keyboardInput.value += key;

        const KeyboardKey = keyboard.p.querySelector(`[data-key="${key}"]`);

        KeyboardKey?.classList.add("pressed");
        setTimeout(() => KeyboardKey?.classList.remove("pressed"), 200);
    };

    word.sub(
        (value) =>
            value
                ? document.addEventListener("keydown", onKeydown)
                : document.removeEventListener("keydown", onKeydown),
        true
    );

    return {
        p: Container,
        c: [keyboard, { p: keyboardInput }],
    };
}
