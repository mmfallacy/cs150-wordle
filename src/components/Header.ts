function Header(): Subtree {
    const Container = styled("header")`
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid ${COLORS.gray[300]};
        padding: 12px;
        position: fixed;
        top: 0;
        width: 100%;
    `;

    const h1 = styled("h1")`
        font-weight: bold;
        font-size: 1.6rem;
    `;
    h1.textContent = "CS 150 Lab 2: Wordle - 202002370";

    return {
        p: Container,
        c: [{ p: h1 }],
    };
}
