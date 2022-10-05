const MAX_NUMBER_OF_GUESSES = 6;

function Game(): Subtree {
    let current_guess_index = 0;

    /** Lifecycles */
    const onMount = () => {
        document.addEventListener("keydown", onKeydown);
        keyboardInput.addEventListener("change", onInputChange);

        waitForElement(keyboard.p, () => {
            KEYBOARD_LAYOUT.flat().map((key) =>
                getKeyboardKey(key).addEventListener(
                    "click",
                    onKeyboardKeyPress
                )
            );
        });
    };

    const onDismount = () => {
        document.removeEventListener("keydown", onKeydown);
        keyboardInput.removeEventListener("change", onInputChange);
        KEYBOARD_LAYOUT.flat().map((key) =>
            getKeyboardKey(key).removeEventListener("click", onKeyboardKeyPress)
        );
    };

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

        // If none of the following, skip handling keypress
        // Enter, Backspace, [a-z]
        if (!/^[a-z]$/.test(key) && key !== "backspace" && key !== "enter")
            return;

        // Pass keyboard event onto the input field
        switch (key) {
            // Remove last character
            case "backspace":
                keyboardInput.value = keyboardInput.value.substring(
                    0,
                    keyboardInput.value.length - 1
                );
                break;
            // Handle enter
            case "enter":
                console.log("Entered");
                processGuess();
                break;
            // Handle [a-z]
            default:
                // Append [a-z] key
                if (keyboardInput.value.length < 5) keyboardInput.value += key;
                // Replace the last character on succeeding
                // keypresses if 5 characters have been filled
                // ADDENDUM: Spec says do nothing
                // else
                //     keyboardInput.value =
                //         keyboardInput.value.substring(
                //             0,
                //             keyboardInput.value.length - 1
                //         ) + key;
                break;
        }
        keyboardInput.dispatchEvent(new Event("change"));

        const KeyboardKey = keyboard.p.querySelector(
            `[data-key="${key === "backspace" ? "⠀⠀←⠀⠀" : key}"]`
        );

        KeyboardKey?.classList.add("pressed");
        setTimeout(() => KeyboardKey?.classList.remove("pressed"), 200);
    };

    const retrieveCurrentGuessByIndex = (index: number): HTMLElement => {
        return guessContainer.childNodes[index] as HTMLElement;
    };

    const retrieveLettersInGuess = (guess: HTMLElement): HTMLCollection => {
        return guess.getElementsByTagName("span");
    };

    const getKeyboardKey = (key: string): HTMLElement => {
        return keyboard.p.querySelector(`[data-key="${key}"]`)!;
    };

    const onInputChange = (e: Event) => {
        const self = e.target as HTMLInputElement;
        const currentGuessDisplay =
            retrieveCurrentGuessByIndex(current_guess_index);

        if (!currentGuessDisplay) return;

        for (let i = 0; i < GUESS_MAX_LENGTH; i++)
            retrieveLettersInGuess(currentGuessDisplay)[i].textContent =
                self.value[i] ?? "";
    };

    const processGuess = async () => {
        const guess = keyboardInput.value;
        const currentGuessDisplay =
            retrieveCurrentGuessByIndex(current_guess_index);

        if (keyboardInput.value.length < 5) return;
        current_guess_index += 1;
        keyboardInput.value = "";

        const { word } = useGlobalStore();

        console.log(word.value, guess, word.value === guess);

        const diff = word.value.split("");

        guess
            .split("")
            .map((char, i) => {
                if (char !== diff[i]) return char;

                diff[i] = "";

                retrieveLettersInGuess(currentGuessDisplay)[i].classList.add(
                    "correct"
                );

                getKeyboardKey(char).classList.add("correct");
            })
            .map((char, i) => {
                if (!char) return;
                if (!diff.includes(char)) return char;

                retrieveLettersInGuess(currentGuessDisplay)[i].classList.add(
                    "misplaced"
                );

                getKeyboardKey(char).classList.add("misplaced");
            })
            .map((char, i) => {
                if (!char) return;
                getKeyboardKey(char).classList.add("wrong");
            });

        if (word.value === guess) return gameWin();

        if (current_guess_index > 5) return gameOver();
    };

    const onKeyboardKeyPress = (e: MouseEvent) => {
        const self = e.target as HTMLSpanElement;
        const key = self.getAttribute("data-key");
        key &&
            document.dispatchEvent(
                new KeyboardEvent("keydown", {
                    key: key === "⠀⠀←⠀⠀" ? "backspace" : key,
                })
            );
    };

    const gameOver = () => {
        const { word } = useGlobalStore();
        onDismount();
        current_guess_index = 0;
        alertAfterRepaint(`gameover. answer is: ${word.value}`);
        // word.pub("");
    };

    const gameWin = () => {
        const winning_index = current_guess_index - 1;
        onDismount();
        current_guess_index = 0;
        alertAfterRepaint("correct");

        // word.pub("");
    };

    const guessContainer = styled("div")`
        display: grid;
        grid-template-rows: repeat(${MAX_NUMBER_OF_GUESSES}, min-content);
        grid-gap: 4px;
    `;

    onMount();

    return {
        p: Container,
        c: [
            Header(),
            {
                p: guessContainer,
                c: Array(MAX_NUMBER_OF_GUESSES)
                    .fill(0)
                    .map((_) => Guess()),
                s: {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                },
            },
            {
                ...keyboard,
                s: {
                    position: "fixed",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                },
            },
            { p: keyboardInput },
        ],
    };
}
