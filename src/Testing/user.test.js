const { User } = require('../models/UserModel');

describe('User Model Test Suite', () => {
  it('should create & save a user successfully', async () => {
    const user = new User({ name: 'Alivia', email: 'alivia@example.com', password: 'Wishcloud123' });
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe('Alivia');
    expect(savedUser.email).toBe('alivia@example.com');
    expect(savedUser.password).toBe('Wishcloud123')
  });

  it('should fetch a user by email', async () => {
    await User.create({ name: 'Alivia', email: 'alivia@example.com', password:'Wishcloud123' });

    const user = await User.findOne({ email: 'alivia@example.com' });

    expect(user).not.toBeNull();
    expect(user.name).toBe('Alivia');
  });

  it('should delete a user', async () => {
    await User.create({ name: 'Alivia', email: 'alivia@example.com', password:"WishCloud123" });

    await User.deleteOne({ email: 'alivia@example.com' });
    const user = await User.findOne({ email: 'alivia@example.com' });

    expect(user).toBeNull();
  });
});
