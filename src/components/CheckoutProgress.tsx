import { Link } from 'react-router-dom';
import { Home, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutProgressProps {
  currentStep: 'cart' | 'checkout' | 'payment' | 'confirmation';
}

const steps = [
  { id: 'cart', label: 'Cart', icon: ShoppingCart },
  { id: 'checkout', label: 'Checkout', icon: CreditCard },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'confirmation', label: 'Confirmation', icon: CheckCircle },
];

const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-primary transition-colors">
            Cart
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Checkout</span>
        </nav>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 md:space-x-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary bg-primary/10"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "ml-2 text-sm font-medium hidden sm:block",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-colors duration-300",
                    isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;
