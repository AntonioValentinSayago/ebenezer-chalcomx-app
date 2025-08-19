import { useMemo, useState } from 'react';

// El genérico <T> hace que el hook pueda funcionar con cualquier tipo de dato
export const useSearchPaginator = <T extends object>(
  data: T[],
  searchKeys: (keyof T)[], // Recibe las propiedades por las que se va a buscar
  itemsPerPage: number = 6
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar datos según el buscador
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return data;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return data.filter(item =>
      searchKeys.some(key =>
        String(item[key]).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [data, searchQuery, searchKeys]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
  };
};