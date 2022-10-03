/// <reference path="utils.ts"/>
/// <reference path="Start.page.ts"/>
/// <reference path="store.ts"/>
/// <reference path="colors.ts"/>
/// <reference path="components/index.ts"/>

const root = document.getElementById("root");
const useGlobalStore = createStore();

const { word } = useGlobalStore();

word.sub((value) => console.log("WORD:", value));

word.sub((value) => root?.renderSubtree(value ? Game() : Start()), true);

// word.pub("hokku");
