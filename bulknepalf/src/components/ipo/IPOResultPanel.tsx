import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Clock, ArrowLeft, Plus, Copy, Trash2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SavedAccount {
  id: string;
  name: string;
  boid: string;
}

type PanelStep = 'intro' | 'accounts' | 'addBoid' | 'accountsList';

interface IPOResultPanelProps {
  open: boolean;
  onClose: () => void;
}

const initialAccounts: SavedAccount[] = [
  { id: '1', name: '_', boid: '1301590001004178' },
  { id: '2', name: 'Brother1', boid: '1301370005006374' },
  { id: '3', name: 'Ghanshyam', boid: '1301370005760249' },
  { id: '4', name: 'Sa', boid: '1301590001425335' },
  { id: '5', name: 'जय', boid: '1301370004391819' },
];

export function IPOResultPanel({ open, onClose }: IPOResultPanelProps) {
  const [step, setStep] = useState<PanelStep>('intro');
  const [accounts, setAccounts] = useState<SavedAccount[]>(initialAccounts);
  const [newBoid, setNewBoid] = useState('');
  const [newName, setNewName] = useState('');
  const [showAccountsList, setShowAccountsList] = useState(false);

  const handleClose = () => {
    setStep('intro');
    setShowAccountsList(false);
    onClose();
  };

  const handleProceed = () => {
    setStep('accounts');
  };

  const handleAddBoid = () => {
    if (newBoid.trim() && newName.trim()) {
      setAccounts(prev => [...prev, {
        id: Date.now().toString(),
        name: newName.trim(),
        boid: newBoid.trim(),
      }]);
      setNewBoid('');
      setNewName('');
      setStep('accounts');
    }
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  const handleCopyBoid = (boid: string) => {
    navigator.clipboard.writeText(boid);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Side Panel - slides from left */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed left-0 top-0 bottom-0 w-[380px] max-w-[90vw] bg-card border-r border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Step: Intro */}
            {step === 'intro' && (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-sm">IPO Result on Sharesansar</span>
                  </div>
                  <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Subtitle */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Usually takes few seconds to see bulk results.</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Illustration area */}
                    <div className="w-48 h-48 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-20 h-32 rounded-lg border-2 border-muted-foreground/30 bg-muted/50 flex flex-col items-center justify-center gap-1">
                          <div className="w-12 h-2 rounded bg-primary/30" />
                          <div className="grid grid-cols-3 gap-1 mt-2">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={i} className="w-3 h-3 rounded-sm bg-muted-foreground/20" />
                            ))}
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-3 w-7 h-7 rounded-full bg-warning flex items-center justify-center">
                          <svg className="w-4 h-4 text-warning-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-sm font-medium mb-1">You are about to check your results</p>
                    <p className="text-center text-sm text-muted-foreground mb-6">IPO Check on Sharesansar</p>

                    <ul className="space-y-3 text-sm text-muted-foreground w-full">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                        We will be authenticate to check bulk results.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                        This take only few minutes to see bulk results
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                        You will be seeing your results here.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Proceed Button */}
                <div className="p-4">
                  <Button
                    onClick={handleProceed}
                    className="w-full h-12 text-base font-semibold bg-success hover:bg-success/90 text-success-foreground rounded-xl"
                  >
                    Proceed Check
                  </Button>
                </div>
              </div>
            )}

            {/* Step: Saved Accounts */}
            {step === 'accounts' && (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setStep('intro')} className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="font-semibold text-sm">IPO Result Check</span>
                  </div>
                  <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 p-4 flex flex-col">
                  {/* Saved Accounts Button */}
                  <button
                    onClick={() => setShowAccountsList(!showAccountsList)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-secondary/80 border border-border hover:bg-secondary transition-colors"
                  >
                    <span className="text-sm font-medium">Saved Accounts ({accounts.length})</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setStep('addBoid'); }}
                        className="w-7 h-7 rounded bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </button>

                  {/* Accounts List - slides up from button */}
                  <AnimatePresence>
                    {showAccountsList && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="bg-card border border-border rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between p-3 border-b border-border">
                            <span className="font-semibold text-sm">Saved Accounts</span>
                            <button onClick={() => setShowAccountsList(false)} className="text-muted-foreground hover:text-foreground">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="max-h-[50vh] overflow-auto">
                            {accounts.map((account) => (
                              <div
                                key={account.id}
                                className="flex items-center gap-3 px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-full bg-muted-foreground/70 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{account.name}</p>
                                  <p className="text-xs text-muted-foreground tabular-nums">{account.boid}</p>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleCopyBoid(account.boid)}
                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted transition-colors"
                                  >
                                    <Copy className="w-4 h-4 text-muted-foreground" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAccount(account.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-destructive/10 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1" />

                  {/* Check Result Button */}
                  <Button
                    className="w-full h-12 text-base font-semibold bg-success hover:bg-success/90 text-success-foreground rounded-xl mt-4"
                  >
                    Check Result
                  </Button>
                </div>
              </div>
            )}

            {/* Step: Add BOID */}
            {step === 'addBoid' && (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 bg-primary/10 border-b border-border">
                  <button onClick={() => setStep('accounts')} className="text-foreground hover:text-muted-foreground">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-sm">Add Boid</span>
                </div>

                <div className="flex-1 p-4 space-y-5">
                  {/* BOID Field */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">BOID</label>
                    <Input
                      placeholder="Eg: 1301385632526874"
                      value={newBoid}
                      onChange={(e) => setNewBoid(e.target.value)}
                      className="h-12 text-sm"
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name</label>
                    <Input
                      placeholder="Dipesh Khanal"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="h-12 text-sm"
                    />
                  </div>

                  {/* ADD Button */}
                  <Button
                    onClick={handleAddBoid}
                    disabled={!newBoid.trim() || !newName.trim()}
                    className="w-full h-12 text-base font-bold bg-foreground text-background hover:bg-foreground/90 rounded-xl"
                  >
                    ADD
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
