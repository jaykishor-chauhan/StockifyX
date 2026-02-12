import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, X, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AuthBrand from '@/components/layout/AuthBrand';

export default function LoginPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  // const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPassword) {
      setShowPassword(true);
      return;
    }

    setSubmitting(true);
    // const { error } = isSignUp
    //   ? await signUp(email, password)
    //   : await signIn(email, password);

    setSubmitting(false);

    // if (error) {
    //   toast({ title: 'Error', description: error.message, variant: 'destructive' });
    // } else if (isSignUp) {
    //   toast({ title: 'Check your email', description: 'We sent you a verification link.' });
    // } else {
    //   navigate('/');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-start mb-8">
            <AuthBrand title={isSignUp ? "Create your account" : "Login in or sign up"} slogan='Track your portfolio, watchlists, and more.' />
          </div>

          {!showPassword && (
            <>
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 rounded-full border border-border bg-card hover:bg-accent/50 transition-colors py-3 px-4 text-sm font-medium text-foreground">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                {/* <button className="w-full flex items-center justify-center gap-3 rounded-full border border-border bg-card hover:bg-accent/50 transition-colors py-3 px-4 text-sm font-medium text-foreground">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button> */}

                <button className="w-full flex items-center justify-center gap-3 rounded-full border border-border bg-card hover:bg-accent/50 transition-colors py-3 px-4 text-sm font-medium text-foreground">
                  <Phone className="w-4 h-4" />
                  Continue with phone
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium tracking-wider">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          <form onSubmit={handleContinue} className="space-y-4">
            {!showPassword ? (
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full h-12 px-5 border-border"
                required
              />
            ) : (
              <div className="space-y-4">
                <div className="text-start mb-2">
                  <p className="text-sm text-muted-foreground">
                    Enter password for <span className="text-foreground font-medium">{email}</span>
                  </p>
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full h-12 px-5 border-border"
                  required
                  autoFocus
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-full h-12 text-base font-semibold"
              disabled={submitting}
            >
              {submitting ? 'Please wait...' : 'Continue'}
            </Button>
          </form>

          {showPassword && (
            <div className="mt-4 flex justify-center items-center gap-2">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(false)}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="link"
                className="text-sm "
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            </div>
          )}

          {/* <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              <a href="#" className="underline hover:text-foreground transition-colors">Terms of Use</a>
              <span className="mx-2">|</span>
              <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
            </p>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}
