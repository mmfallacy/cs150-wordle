const GUESS_MAX_LENGTH = 5;

function Guess(): Subtree {
    /** Components */
    const Container = styled("div")`
        text-align: center;
    `;
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
