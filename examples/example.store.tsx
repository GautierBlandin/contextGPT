import { defineStore } from '@contextgpt/utils';

export type IndexedTitleV2 = {
  uuid: string;
  title: string;
  description: string;
}

interface TitleSelectorStore {
  selectedTitles: IndexedTitleV2[];
  actions: {
    selectTitle(title: IndexedTitleV2): void;
    selectTitles(titles: IndexedTitleV2[]): void;
    unselectTitle(title: IndexedTitleV2): void;
    unselectTitles(titles: IndexedTitleV2[]): void;
    clearSelectedTitles(): void;
  };
}

export const [TitleSelectorProvider, useTitleSelectorStore] = defineStore<TitleSelectorStore>((set, get) => ({
  selectedTitles: [],
  actions: {
    selectTitle(title: IndexedTitleV2) {
      set({ selectedTitles: [...get().selectedTitles, title] });
    },
    selectTitles(titles: IndexedTitleV2[]) {
      const mergedTitles = [...get().selectedTitles, ...titles];
      const uniqueTitles = mergedTitles.filter(
        (title, index, self) => self.findIndex((t) => t.uuid === title.uuid) === index,
      );

      set({ selectedTitles: uniqueTitles });
    },
    unselectTitle(title: IndexedTitleV2) {
      const filteredTitles = get().selectedTitles.filter(({ uuid }) => uuid !== title.uuid);
      set({ selectedTitles: filteredTitles });
    },
    unselectTitles(titles: IndexedTitleV2[]) {
      const filteredTitles = get().selectedTitles.filter(({ uuid }) => !titles.some((title) => title.uuid === uuid));
      set({ selectedTitles: filteredTitles });
    },
    clearSelectedTitles() {
      set({ selectedTitles: [] });
    },
  },
}));

export const titleSelectorSelector = {
  actions: (state: TitleSelectorStore) => state.actions,
  selectedTitles: (state: TitleSelectorStore) => state.selectedTitles,
  isTitleSelected(title: IndexedTitleV2) {
    return (state: TitleSelectorStore) => state.selectedTitles.some(({ uuid }) => title.uuid === uuid);
  },
  areTitlesSelected(titles: IndexedTitleV2[]) {
    return (state: TitleSelectorStore) => {
      if (titles.length === 0 || state.selectedTitles.length === 0) return false;
      return titles.every(({ uuid }) => state.selectedTitles.some((title) => title.uuid === uuid));
    };
  },
};
