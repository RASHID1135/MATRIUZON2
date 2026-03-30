export type Category = 'Action' | 'Comedy' | 'Drama' | 'Sci-Fi';

export interface LocalizedString {
  ru: string;
  en: string;
  uz: string;
}

export interface Movie {
  id: string;
  title: LocalizedString;
  year: number;
  rating: number;
  category: Category;
  description: LocalizedString;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  cast: string[];
}
