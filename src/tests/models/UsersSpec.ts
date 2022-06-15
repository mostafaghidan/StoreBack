import { UsersCRUD } from '../../models/Users';
const UserTest = new UsersCRUD();
describe('User Model', () => {
  it('shoud have an index method', () => {
    expect(UserTest.index).toBeDefined();
  });
  it('shoud have an create method', () => {
    expect(UserTest.create).toBeDefined();
  });
  it('shoud have an delete method', () => {
    expect(UserTest.delete).toBeDefined();
  });
  it('shoud have an update method', () => {
    expect(UserTest.update).toBeDefined();
  });
  it('shoud have an read method', () => {
    expect(UserTest.read).toBeDefined();
  });
  it('shoud create method return a user data', async () => {
    const username = 'mostafa';
    const email = 'mostafa';
    const password = '123456';
    const result = await UserTest.create(username, email, password);
    if (result !== null) {
      expect(result.user.id).toEqual(1);
      expect(result.token).toBeDefined();
    }
  });
  it('shoud index method return a list of users', async () => {
    const result = await UserTest.index();
    if (result !== null) {
      expect(result[0].id).toEqual(1);
    }
  });

  it('shoud update method return a updated user', async () => {
    const id = 2;
    const username = 'mostafa-updated';
    const email = 'mostafa';
    const password = '123456';
    const result = await UserTest.update(id, username, email, password);
    if (result !== null) {
      expect(result.id).toEqual(2);
      expect(result.username).toEqual('mostafa-updated');
    }
  });
  it('shoud read method return a user', async () => {
    const id = 2;
    const result = await UserTest.read(id);
    if (result !== null) {
      expect(result.id).toEqual(2);
      expect(result.username).toEqual('mostafa-updated');
    }
  });
  it('shoud delete method return deleted user', async () => {
    const id = 2;
    const result = await UserTest.delete(id);
    if (result !== null) {
      expect(result.id).toEqual(2);
      expect(result.username).toEqual('mostafa-updated');
    }
  });
});
