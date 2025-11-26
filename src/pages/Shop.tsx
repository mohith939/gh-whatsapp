import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/data/products';

const Shop = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(product => {
      product.category.forEach(cat => cats.add(cat));
    });
    return Array.from(cats).sort();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (categoryFilter !== 'all') {
      filtered = products.filter(p => p.category.includes(categoryFilter));
    }

    let sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.variants[0].price - b.variants[0].price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.variants[0].price - a.variants[0].price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return sorted;
  }, [categoryFilter, sortBy]);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Shop All Products
          </h1>
          <p className="text-foreground/70 max-w-2xl">
            Browse our complete collection of 19 pure, raw powders. All products are lab-tested, FSSAI certified, and available in multiple pack sizes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-foreground">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-foreground">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow border-border bg-card group">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{product.name}</h3>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary font-bold">From ₹{product.variants[0].price}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.highlights.slice(0, 2).map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
