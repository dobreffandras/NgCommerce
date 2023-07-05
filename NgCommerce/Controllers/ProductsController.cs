﻿using Microsoft.AspNetCore.Mvc;
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
            return Ok(await productsService.GetProducts());
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public void Post([FromBody] Product value)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Product value)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}