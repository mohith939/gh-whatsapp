import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Check, Heart, Clock, Shield, Factory } from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, product.variants[selectedVariant], 1);
    toast({
      title: "Added to cart",
      description: `${product.name} (${product.variants[selectedVariant].weight}) added to your cart.`,
    });
  };

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-foreground/60">
          <button onClick={() => navigate('/shop')} className="hover:text-primary">Shop</button>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {product.highlights.map((highlight, idx) => (
                <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                  {highlight}
                </Badge>
              ))}
            </div>

            <p className="text-lg text-foreground/80 mb-6">{product.shortDescription}</p>

            {/* Long Description */}
            <div className="mb-6">
              <p className="text-foreground/80 leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Weight Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 text-foreground">Select Pack Size:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.variants.map((variant, idx) => (
                  <Card
                    key={variant.sku}
                    className={`cursor-pointer transition-all ${
                      selectedVariant === idx 
                        ? 'border-primary border-2 bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedVariant(idx)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="font-semibold text-primary">{variant.weight}</div>
                      <div className="text-lg font-bold mt-1">₹{variant.price}</div>
                      <div className="text-xs text-foreground/60 mt-1">
                        {variant.stock > 0 ? `In Stock` : 'Out of Stock'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="bg-warm-beige p-6 rounded-lg mb-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.variants[selectedVariant].price}
                </span>
                <span className="text-foreground/60">for {product.variants[selectedVariant].weight}</span>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={product.variants[selectedVariant].stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <p className="text-sm text-center text-foreground/60 mt-3">
                Cash on Delivery available | Free shipping on orders above ₹500
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-3 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-secondary" />
                Benefits:
              </h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-secondary" />
                Usage:
              </h3>
              <p className="text-foreground/80">{product.usage}</p>
            </div>

            {/* Dosage */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-2 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-secondary" />
                Recommended Dosage:
              </h3>
              <p className="text-foreground/80">{product.dosage}</p>
            </div>

            {/* Storage */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-2 flex items-center">
                <Factory className="w-5 h-5 mr-2 text-secondary" />
                Storage Instructions:
              </h3>
              <p className="text-foreground/80">{product.storage}</p>
            </div>

            {/* Safety Notes */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-2 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-secondary" />
                Safety Notes:
              </h3>
              <p className="text-foreground/80">{product.safety}</p>
            </div>

            {/* How It's Made */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-2 flex items-center">
                <Factory className="w-5 h-5 mr-2 text-secondary" />
                How It's Made:
              </h3>
              <p className="text-foreground/80 whitespace-pre-line">{product.howItMade}</p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {product.category.map((cat, idx) => (
                  <Badge key={idx} variant="outline" className="border-primary text-primary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
