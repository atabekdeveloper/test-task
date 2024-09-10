const navLinks = [
  { id: 1, title: 'Products', link: '/products' },
  { id: 2, title: 'Users', link: '/users' },
  { id: 3, title: 'Posts', link: '/posts' },
  { id: 4, title: 'Todos', link: '/todos' },
];
const sortProducts = [
  { id: 0, text: 'Default', sortBy: '', order: '' },
  { id: 1, text: 'Price (Asc)', sortBy: 'price', order: 'asc' },
  { id: 2, text: 'Price (Decs)', sortBy: 'price', order: 'desc' },
  { id: 3, text: 'Rating (Asc)', sortBy: 'price', order: 'asc' },
  { id: 4, text: 'Rating (Decs)', sortBy: 'price', order: 'desc' },
];
const sortUsers = [
  { id: 0, text: 'Default', sortBy: '', order: '' },
  { id: 1, text: 'Age (Asc)', sortBy: 'age', order: 'asc' },
  { id: 2, text: 'Age (Decs)', sortBy: 'age', order: 'desc' },
];
const sortPosts = [
  { id: 0, text: 'Default', sortBy: '', order: '' },
  { id: 1, text: 'Views (Asc)', sortBy: 'views', order: 'asc' },
  { id: 2, text: 'Views (Decs)', sortBy: 'views', order: 'desc' },
];
const sortTodos = [{ id: 0, text: 'Default', sortBy: '', order: '' }];
export { navLinks, sortProducts, sortUsers, sortPosts, sortTodos };
