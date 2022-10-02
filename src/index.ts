/// <reference path="utils.ts"/>
/// <reference path="Start.page.ts"/>
/// <reference path="store.ts"/>
/// <reference path="colors.ts"/>

const root = document.getElementById("root");
const useGlobalStore = createStore();

const { word } = useGlobalStore();

word.sub((value) => console.log("WORD:", value));

const h1 = styled("h1")`
    font-size: 10rem;
    color: red;
`;

word.sub((value) => (h1.textContent = value));

word.sub(
    (value) => root?.renderSubtree(value ? KeyboardLayout() : Start()),
    true
);

word.pub("wroth");
