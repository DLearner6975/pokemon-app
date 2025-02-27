import { AccordionItem, AccordionTrigger, AccordionContent } from './accordion';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterAccordionItemProps {
  value: string;
  icon: LucideIcon;
  title: string;
  items: string[];
  isOpen: boolean;
  isMobileOpen: boolean;
  selectedItems: string[];
  onItemChange: (value: string[]) => void;
}

export function FilterAccordionItem({
  value,
  icon: Icon,
  title,
  items,
  isOpen,
  isMobileOpen,
  selectedItems,
  onItemChange,
}: FilterAccordionItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger
        className={cn(
          'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
          { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span
          className={cn('flex-1 text-left', {
            hidden: !isOpen && !isMobileOpen,
          })}
        >
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className={cn({ hidden: !isOpen && !isMobileOpen })}>
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2 mb-2 pl-6">
            <Checkbox
              id={`${value}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) => {
                const newItems = checked
                  ? [...selectedItems, item]
                  : selectedItems.filter((i) => i !== item);
                onItemChange(newItems);
              }}
            />
            <Label htmlFor={`${value}-${item}`}>{item}</Label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
