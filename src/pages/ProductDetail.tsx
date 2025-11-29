import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Star, Truck, Shield, Award, Users } from 'lucide-react';
import { trackProductView, trackAddToCart } from '@/utils/analytics';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  useEffect(() => {
    // Track product view
    trackProductView({
      id: product.id,
      name: product.name,
      category: product.category.join(', '),
      price: product.variants[0]?.price || 0,
    });
  }, [product]);

  const handleAddToCart = () => {
    // Find the first variant
    const variant = product.variants[0];
    addToCart(product, variant, quantity);
    // Track add to cart event
    trackAddToCart({
      id: product.id,
      name: product.name,
      category: product.category.join(', '),
      price: variant.price,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">₹{product.variants[0].price}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.category.map((cat, idx) => (
                <Badge key={idx} variant="secondary">{cat}</Badge>
              ))}
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed">{product.shortDescription}</p>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4 border-green-200 bg-green-50">
              <CardContent className="p-0">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Lab Tested</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 border-blue-200 bg-blue-50">
              <CardContent className="p-0">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Fast Delivery</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 border-purple-200 bg-purple-50">
              <CardContent className="p-0">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">100% Pure</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 border-orange-200 bg-orange-50">
              <CardContent className="p-0">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">FSSAI Certified</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-border rounded px-3 py-2"
            >
              {[...Array(10)].map((_, i) => (
                <li key={i + 1} value={i + 1}>{i + 1}</li>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} className="w-full py-3 text-lg">
            Add to Cart - ₹{product.variants[0].price * quantity}
          </Button>

          {/* Additional Info */}
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Users className="w-4 h-4" />
              <span>Trusted by 500+ businesses across India</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.8/5 rating from verified customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
