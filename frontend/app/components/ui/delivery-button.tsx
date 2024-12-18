import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DeliverySelector = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('CR');
  const [open, setOpen] = React.useState(false);

  const countryNames = {
    CR: 'Costa Rica'
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="group flex items-center gap-2">
          <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline">Deliver to</span>
          <span>{countryNames[selectedCountry]}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose your delivery location</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value);
              setOpen(false);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇨🇷</span>
                  <span>{countryNames[selectedCountry]}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="CR">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇨🇷</span>
                    <span>Costa Rica</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="mt-4 text-sm text-muted-foreground">
            Currently, we only deliver to Costa Rica. More countries coming soon!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliverySelector;