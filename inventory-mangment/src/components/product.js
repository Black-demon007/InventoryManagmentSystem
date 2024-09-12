const products = [
    { id: 1, color: 'red', size: 'L', brand: 'Nike' },
    { id: 2, color: 'blue', size: 'S', brand: 'Adidas' },
    { id: 3, color: 'red', size: 'S', brand: 'Puma' },
    { id: 4, color: 'green', size: 'XL', brand: 'Nike' },
    { id: 6, color: 'red', size: 'L', brand: 'Nike' },
    { id: 7, color: 'red', size: 'L', brand: 'Nike' },
  ];
  
  const filters = { color: 'red', brand: 'Nike', size: 'L' };
  
  const applyFilters = (items, filters) => {
    return items.reduce((acc, item) => {
      const matches = Object.keys(filters).every((key) => item[key] === filters[key]);
      if (matches) acc.push(item);
      return acc;
    }, []);
  };
  
  const filteredProducts = applyFilters(products, filters);
  const sortedProducts = filteredProducts.sort((a, b) => b.id - a.id);
  
  console.log(sortedProducts);
  