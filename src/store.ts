function createStore() {
    const word = useSubscribable("");
    return () => {
        return {
            word,
        };
    };
}
