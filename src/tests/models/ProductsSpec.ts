import { ProductsCRUD } from '../../models/Products';
const productTest = new ProductsCRUD();
describe('Product Model', () => {
  it('shoud have an index method', () => {
    expect(productTest.index).toBeDefined();
  });
  it('shoud have an create method', () => {
    expect(productTest.create).toBeDefined();
  });
  it('shoud have an delete method', () => {
    expect(productTest.delete).toBeDefined();
  });
  it('shoud have an update method', () => {
    expect(productTest.update).toBeDefined();
  });
  it('shoud have an read method', () => {
    expect(productTest.read).toBeDefined();
  });
  it('shoud create method return a product data', async () => {
    const name = 'milk';
    const price = 10;
    const result = await productTest.create(name, price);
    expect(result.id).toEqual(2);
    expect(result.name).toEqual('milk');
    expect(result.price).toEqual(10);
  });
  it('shoud index method return a list of products', async () => {
    const result = await productTest.index();
    expect(result[0].id).toEqual(2);
    expect(result[0].name).toEqual('milk');
    expect(result[0].price).toEqual(10);
  });

  it('shoud update method return a updated product', async () => {
    const id = 2;
    const name = 'cheese';
    const price = 15;
    const result = await productTest.update(id, name, price);
    expect(result.id).toEqual(2);
    expect(result.name).toEqual('cheese');
    expect(result.price).toEqual(15);
  });
  it('shoud read method return a pdoduct', async () => {
    const id = 2;
    const result = await productTest.read(id);
    expect(result.id).toEqual(2);
    expect(result.name).toEqual('cheese');
    expect(result.price).toEqual(15);
  });
  it('shoud delete method return deleted product', async () => {
    const id = 2;
    const result = await productTest.delete(id);
    expect(result.id).toEqual(2);
    expect(result.name).toEqual('cheese');
    expect(result.price).toEqual(15);
  });
});
