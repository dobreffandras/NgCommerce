export interface Paged<T> {
    items: T[],
    currentPage: number,
    totalPages: number,
    itemsPerPage: number
}