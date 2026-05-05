import FlexSearch from 'flexsearch';

interface ISearchNode {
  title: string;
  url: string;
}

interface IIndexEntry {
  id: number;
  title: string;
  url: string;
}

let index: FlexSearch.Index | null = null;
let store: ISearchNode[] = [];
let initialized = false;

async function initSearch(): Promise<void> {
  if (initialized) return;
  initialized = true;

  try {
    const data: IIndexEntry[] = await fetch('/search-index.json').then((r) =>
      r.json(),
    );

    index = new FlexSearch.Index({ tokenize: 'forward' });

    store = data.map((entry) => ({ title: entry.title, url: entry.url }));

    data.forEach((entry) => {
      index!.add(entry.id, entry.title);
    });
  } catch {
    // Search index not available (e.g. dev server before build)
  }
}

export async function getSearchResults(query: string): Promise<ISearchNode[]> {
  await initSearch();

  if (!index || !query) return [];

  const results = index.search(query);
  return results
    .map((id) => store[id as number])
    .filter((node): node is ISearchNode => Boolean(node));
}
