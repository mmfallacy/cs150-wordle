const GUESS_MAX_LENGTH = 5;

css`
    & .correct {
        background-color: ${COLORS.green[500]} !important;
        border: 1px transparent !important;
    }

    & .misplaced {
        background-color: ${COLORS.orange[400]} !important;
        border: 1px transparent !important;
    }
`("guess");

function Guess(): Subtree {
    /** Components */
    const Container = styled("div")`
        text-align: center;
    `;

    Container.classList.add("guess");

    const Grid = styled("div")`
        display: inline-grid;
        grid-gap: 4px;
        grid-template-columns: repeat(${GUESS_MAX_LENGTH}, min-content);
    `;
    const Letter = () => {
        const span = styled("span")`
            border: 1px solid ${COLORS.gray[500]};
            height: 60px;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
            font-weight: bold;
        `;

        return span;
    };

    return {
        p: Container,
        c: [
            {
                p: Grid,
                c: Array(GUESS_MAX_LENGTH)
                    .fill(0)
                    .map((_) => ({ p: Letter() })),
            },
        ],
    };
}
