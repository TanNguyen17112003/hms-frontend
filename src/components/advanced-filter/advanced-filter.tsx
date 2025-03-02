// src/components/advanced-filter.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useDialog } from '@hooks';
import AdvancedFilterDialog from './advanced-filter-dialog';
import { Filter } from 'src/types/filter';
import { Filter as FilterIcon } from 'lucide-react';

interface AdvancedFilterProps {
  filters: Filter[];
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ filters }) => {
  const advancedFilterDialog = useDialog();

  return (
    <>
      <Button
        variant='outlined'
        onClick={advancedFilterDialog.handleOpen}
        endIcon={<FilterIcon size={16} />}
      >
        Filter
      </Button>
      <AdvancedFilterDialog
        open={advancedFilterDialog.open}
        onClose={advancedFilterDialog.handleClose}
        filters={filters}
      />
    </>
  );
};

export default AdvancedFilter;
