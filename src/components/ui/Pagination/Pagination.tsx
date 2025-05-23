import { Button as MUIButton, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import _ from 'lodash';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo, type FC } from 'react';
import { Button } from '../../shadcn/ui/button';
import { useResponsive } from 'src/utils/use-responsive';

interface PaginationProps {
  page: number;
  count: number;
  rowsPerPage: number;
  onChange: (event: any, page: number) => void;
  length?: number;
}

const Pagination: FC<PaginationProps> = ({ page, count, onChange, rowsPerPage, length = 1 }) => {
  const totalPages = Math.ceil(count / rowsPerPage) || 1;
  const { isMobile } = useResponsive();
  const buttonIndexes = useMemo(() => {
    let indexes: number[] = [0, 1, page, totalPages - 1, totalPages - 2];
    for (let i = 1; i <= length; i++) {
      indexes.push(...[page - i, page + i]);
    }
    for (let i = 0; i < indexes.length; i++) {
      indexes[i] = Math.min(Math.max(0, indexes[i]), totalPages - 1);
    }
    indexes = indexes.sort((a, b) => a - b);
    indexes = _.sortedUniq(indexes);
    const results: number[] = [];
    for (let i = 0; i < indexes.length; i++) {
      results.push(indexes[i]);
      if (i < indexes.length - 1) {
        if (indexes[i + 1] == indexes[i] + 2) {
          results.push(indexes[i] + 1);
        } else if (indexes[i + 1] > indexes[i] + 2) {
          results.push(Math.random() * -1);
        }
      }
    }
    return results;
  }, [length, page, totalPages]);

  return (
    <div className='flex justify-between items-center gap-2 self-center w-full border px-6 py-3 rounded-lg shadow-lg'>
      <MUIButton
        startIcon={<ArrowLeft color='black' />}
        variant='outlined'
        onClick={(e) => onChange(e, page > 0 ? page - 1 : page)}
        color='secondary'
      >
        {!isMobile && <Typography>Previous</Typography>}
      </MUIButton>

      <Stack direction={'row'} gap={1} alignItems={'center'}>
        {buttonIndexes.map((index) => (
          <Button
            className={clsx(
              'rounded-lg z-40',
              page == index ? 'bg-[#624DE3] text-white' : 'bg-[#E0E0E0] text-black'
            )}
            variant={page == index ? undefined : 'outline'}
            key={index}
            onClick={index >= 0 ? (e) => onChange(e, index) : undefined}
            disabled={index == -1}
          >
            {index >= 0 ? index + 1 : '...'}
          </Button>
        ))}
      </Stack>

      <MUIButton
        endIcon={<ArrowRight color='black' />}
        variant='outlined'
        onClick={(e) => onChange(e, page < totalPages - 1 ? page + 1 : page)}
        color='secondary'
      >
        {!isMobile && <Typography>Next</Typography>}
      </MUIButton>
    </div>
  );
};

export default Pagination;
