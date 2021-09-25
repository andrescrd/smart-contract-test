var assert = require('assert');

const Market = artifacts.require('Market');

contract('Market', (accounts) => {
  it('should have products', async () => {
    const instance = await Market.new();
    let total = await instance.totalProducts();
    assert(total > 0);
  });

  it('should allow customers to buy product', async () => {
    const instance = await Market.new();
    const product = await instance.products(0);
    const name = product[0], price = product[1];

    await instance.buyProduct(0, { from: accounts[0], value: price });
    const customerProduct = await instance.customerProducts(accounts[0], 0);
    const customerTotalProduct = await instance.customerTotalProducts(accounts[0]);

    assert(customerProduct[0], name);
    assert(customerProduct[1], price);
    assert(customerTotalProduct, 1);
  });

  it('should not allow buy under price', async () => {
    const instance = await Market.new();
    const product = await instance.products(0);
    const name = product[0], price = product[1];

    try {
      await instance.buyProduct(0, { from: accounts[0], value: price/2 });
    } catch (error) {
      return;
    }

    assert.fail();
  });
});