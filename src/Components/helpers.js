export const getUserInfo = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? { name: user.name, avatar: user.avatarUrl } : { name: 'Unknown', avatar: '' };
  };
  