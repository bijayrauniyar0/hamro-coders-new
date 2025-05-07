import User from '../models/userModels';

export const findOrCreateGoogleUser = async (googleData: any) => {
  let user = await User.findOne({ where: { email: googleData.email } });

  if (!user) {
    user = await User.create({
      name: googleData.name,
      email: googleData.email,
      avatar: googleData.picture,
      password: '12345678',
    });
  }

  return user;
};
