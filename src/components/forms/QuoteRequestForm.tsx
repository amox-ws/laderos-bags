// Quote Request Form Component - Laderos Bags
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import QuoteRequestModal from './QuoteRequestModal';

type BagType = 'paper' | 'plastic';

interface QuoteRequestFormProps {
  bagType: BagType;
}

// Common sizes for both bag types
const sizes = [
  '53x43x14',
  '28x38x9',
  '40x34x12',
  '24x24x10',
  '38x31x9',
  '25x40x12',
  '40x40x15',
  '60x50x15',
  '25x25x12',
  '28x24x9',
  'custom',
];

// Paper bag handles
const paperHandles = [
  { id: 'ribbon', el: 'Κορδέλα', en: 'Ribbon' },
  { id: 'cord', el: 'Κορδόνι', en: 'Cord' },
  { id: 'twisted', el: 'Στριφτή Λαβή', en: 'Twisted Handle' },
  { id: 'elastic', el: 'Λάστιχο', en: 'Elastic' },
];

// Plastic bag handles
const plasticHandles = [
  { id: 'handle', el: 'Λαβή', en: 'Handle' },
  { id: 'vest', el: 'Φανελάκι', en: 'Vest (T-shirt)' },
  { id: 'loop', el: 'Loop', en: 'Loop' },
];

// Finishing options (Paper only)
const finishingOptions = [
  { id: 'lamination', el: 'Πλαστικοποίηση', en: 'Lamination' },
  { id: 'matte', el: 'Ματ', en: 'Matte' },
  { id: 'glossy', el: 'Γυαλιστερό', en: 'Glossy' },
];

// Printing options
const printingOptions = [
  { id: '1color', el: '1 χρώμα', en: '1 color' },
  { id: '2colors', el: '2 χρώματα', en: '2 colors' },
  { id: '3colors', el: '3 χρώματα', en: '3 colors' },
  { id: '4colors', el: '4 χρώματα', en: '4 colors' },
];

// Extra processing (Paper only)
const extraProcessing = [
  { id: 'hotStamping', el: 'Θερμοτυπία', en: 'Hot stamping' },
  { id: 'insidePrinting', el: 'Εσωτερική εκτύπωση', en: 'Inside printing' },
  { id: 'embossedLogo', el: 'Ανάγλυφο λογότυπο', en: 'Embossed logo' },
  { id: 'roundHole', el: 'Στρογγυλή τρύπα', en: 'Round hole' },
];

interface CustomSize {
  height: string;
  width: string;
  gusset: string;
}

interface FormData {
  bagType: BagType;
  size: string;
  customSize: CustomSize;
  handle: string;
  finishing: string[];
  printing: string;
  extraProcessing: string[];
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ bagType }) => {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    bagType,
    size: '',
    customSize: { height: '', width: '', gusset: '' },
    handle: '',
    finishing: [],
    printing: '',
    extraProcessing: [],
  });

  const handles = bagType === 'paper' ? paperHandles : plasticHandles;

  const handleSizeSelect = (size: string) => {
    setFormData(prev => ({ 
      ...prev, 
      size,
      // Reset custom size when selecting a predefined size
      customSize: size !== 'custom' ? { height: '', width: '', gusset: '' } : prev.customSize
    }));
  };

  const handleCustomSizeChange = (field: keyof CustomSize, value: string) => {
    // Only allow numeric values
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      customSize: { ...prev.customSize, [field]: numericValue }
    }));
  };

  const handleHandleSelect = (handle: string) => {
    setFormData(prev => ({ ...prev, handle }));
  };

  const handleFinishingToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      finishing: prev.finishing.includes(id)
        ? prev.finishing.filter(f => f !== id)
        : [...prev.finishing, id],
    }));
  };

  const handlePrintingSelect = (printing: string) => {
    setFormData(prev => ({ ...prev, printing }));
  };

  const handleExtraProcessingToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      extraProcessing: prev.extraProcessing.includes(id)
        ? prev.extraProcessing.filter(e => e !== id)
        : [...prev.extraProcessing, id],
    }));
  };

  const handleSubmitClick = () => {
    setIsModalOpen(true);
  };

  const getSelectedSummary = () => {
    const summary: { label: string; value: string }[] = [];
    
    if (formData.size) {
      if (formData.size === 'custom') {
        const { height, width, gusset } = formData.customSize;
        const customValue = height && width && gusset 
          ? `${height} x ${width} x ${gusset} (${t('quoteForm.customSize')})`
          : t('quoteForm.customSize');
        summary.push({
          label: t('quoteForm.size'),
          value: customValue,
        });
      } else {
        summary.push({
          label: t('quoteForm.size'),
          value: formData.size,
        });
      }
    }
    
    if (formData.handle) {
      const handleOption = handles.find(h => h.id === formData.handle);
      summary.push({
        label: t('quoteForm.handles'),
        value: handleOption ? (language === 'el' ? handleOption.el : handleOption.en) : '',
      });
    }
    
    if (bagType === 'paper' && formData.finishing.length > 0) {
      const finishingLabels = formData.finishing.map(id => {
        const option = finishingOptions.find(f => f.id === id);
        return option ? (language === 'el' ? option.el : option.en) : '';
      });
      summary.push({
        label: t('quoteForm.finishing'),
        value: finishingLabels.join(', '),
      });
    }
    
    if (formData.printing) {
      const printOption = printingOptions.find(p => p.id === formData.printing);
      summary.push({
        label: t('quoteForm.printing'),
        value: printOption ? (language === 'el' ? printOption.el : printOption.en) : '',
      });
    }
    
    if (bagType === 'paper' && formData.extraProcessing.length > 0) {
      const extraLabels = formData.extraProcessing.map(id => {
        const option = extraProcessing.find(e => e.id === id);
        return option ? (language === 'el' ? option.el : option.en) : '';
      });
      summary.push({
        label: t('quoteForm.extraProcessing'),
        value: extraLabels.join(', '),
      });
    }
    
    return summary;
  };

  return (
    <>
      <div className="w-full">
        {/* Form Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide">
            {t('quoteForm.title')}
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            {t('quoteForm.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* Size Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('quoteForm.size')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeSelect(size)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200',
                    formData.size === size
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-background text-foreground border-border hover:border-brand/50 hover:bg-muted'
                  )}
                >
                  {size === 'custom' ? t('quoteForm.customSize') : size}
                </button>
              ))}
            </div>

            {/* Custom Size Inputs */}
            {formData.size === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  {t('quoteForm.customSizeHint')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label 
                      htmlFor="customHeight" 
                      className="text-xs font-semibold text-foreground uppercase tracking-wider"
                    >
                      {t('quoteForm.height')} (cm)
                    </Label>
                    <Input
                      id="customHeight"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.customSize.height}
                      onChange={(e) => handleCustomSizeChange('height', e.target.value)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label 
                      htmlFor="customWidth" 
                      className="text-xs font-semibold text-foreground uppercase tracking-wider"
                    >
                      {t('quoteForm.width')} (cm)
                    </Label>
                    <Input
                      id="customWidth"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.customSize.width}
                      onChange={(e) => handleCustomSizeChange('width', e.target.value)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label 
                      htmlFor="customGusset" 
                      className="text-xs font-semibold text-foreground uppercase tracking-wider"
                    >
                      {t('quoteForm.gusset')} (cm)
                    </Label>
                    <Input
                      id="customGusset"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.customSize.gusset}
                      onChange={(e) => handleCustomSizeChange('gusset', e.target.value)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Handles Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('quoteForm.handles')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {handles.map((handle) => (
                <button
                  key={handle.id}
                  type="button"
                  onClick={() => handleHandleSelect(handle.id)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200',
                    formData.handle === handle.id
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-background text-foreground border-border hover:border-brand/50 hover:bg-muted'
                  )}
                >
                  {language === 'el' ? handle.el : handle.en}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Finishing (Paper bags only) */}
          {bagType === 'paper' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {t('quoteForm.finishing')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {finishingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleFinishingToggle(option.id)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200',
                      formData.finishing.includes(option.id)
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-background text-foreground border-border hover:border-brand/50 hover:bg-muted'
                    )}
                  >
                    {language === 'el' ? option.el : option.en}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Printing Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('quoteForm.printing')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {printingOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handlePrintingSelect(option.id)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200',
                    formData.printing === option.id
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-background text-foreground border-border hover:border-brand/50 hover:bg-muted'
                    )}
                >
                  {language === 'el' ? option.el : option.en}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Extra Processing (Paper bags only) */}
          {bagType === 'paper' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {t('quoteForm.extraProcessing')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {extraProcessing.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleExtraProcessingToggle(option.id)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200',
                      formData.extraProcessing.includes(option.id)
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-background text-foreground border-border hover:border-brand/50 hover:bg-muted'
                    )}
                  >
                    {language === 'el' ? option.el : option.en}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pt-4"
          >
            <Button
              type="button"
              size="lg"
              onClick={handleSubmitClick}
              className="w-full md:w-auto min-w-[200px] bg-white text-primary font-bold hover:bg-gray-100 shadow-lg"
            >
              {t('quoteForm.submit')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        summary={getSelectedSummary()}
        bagType={bagType}
      />
    </>
  );
};

export default QuoteRequestForm;
