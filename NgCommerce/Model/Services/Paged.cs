namespace NgCommerce.Model.Services;

public class Paged<T>
{
    public Paged(
        IEnumerable<T> items, 
        int currentPage, 
        int totalPages,
        int itemsPerPage)
    {
        Items = items;
        CurrentPage = currentPage;
        TotalPages = totalPages;
        ItemsPerPage = itemsPerPage;
    }

    public IEnumerable<T> Items { get; }

    public int CurrentPage { get; }
    
    public int TotalPages { get; }

    public int ItemsPerPage { get; }
}
