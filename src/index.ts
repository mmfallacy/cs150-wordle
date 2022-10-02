/// <reference path="utils.ts"/>
/// <reference path="Start.page.ts"/>
/// <reference path="store.ts"/>

const root = document.getElementById("root");
const useGlobalStore = createStore();

const { word } = useGlobalStore();

word.sub((value) => console.log("WORD:", value));

root?.renderSubtree(Start());
