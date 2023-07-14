using Microsoft.AspNetCore.Mvc;
using NgCommerce.Model;
using NgCommerce.Model.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NgCommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService productsService;

        public ProductsController(IProductsService productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return Ok(await productsService.GetProducts()); // TODO Add pagination
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var res = await productsService.GetProduct(id);
            return res.Match<ActionResult<Product>>(
                onSuccess: product => Ok(product),
                onError: message => BadRequest(message));
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromBody] NewProduct product)
        {
            var res = await productsService.CreateProduct(product);
            return res.Match<ActionResult<Product>>(
                onSuccess: product => Ok(product),
                onError: message => BadRequest(message));
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Product product)
        {
            var res = await productsService.UpdateProduct(product);
            return res.Match<ActionResult>(
                onSuccess: NoContent,
                onError: BadRequest);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var res = await productsService.DeleteProduct(id);
            return res.Match<ActionResult>(
                onSuccess: NoContent,
                onError: BadRequest);
        }
    }
}
