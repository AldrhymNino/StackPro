/*
 * SearchItem — entrada del índice de búsqueda global.
 *
 * Cada proyecto, nota y roadmap genera una entrada con sus palabras
 * clave para que GlobalSearch pueda encontrarla y navegar a su ruta.
 */
type SearchItem = {
  id: string;
  type: "project" | "note" | "roadmap";
  title: string;
  keywords: string[];
  route: string;
};

export type { SearchItem };
