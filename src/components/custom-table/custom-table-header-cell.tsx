import {
  CustomTableProps,
  CustomTableSortModel,
  CustomTableConfig,
} from "./custom-table.types";
import { CustomTableResizableCell } from "./custom-table-resizable-cell";
import CustomTableSortLabel from "./custom-table-sort-label";

export function CustomTableHeaderCell<
  P,
  T extends { id: P; [key: string]: any }
>(
  props: CustomTableProps<P, T> & {
    sortModel?: CustomTableSortModel<P, T>;
    onClickSort?: (key: keyof T | string) => void;
    onResize?: () => void;
    hasGroupedHeaderLabel: boolean;
    config: CustomTableConfig<P, T>;
  }
) {
  const { hasGroupedHeaderLabel, configs, config, sortModel, onClickSort } =
    props;

  return (
    <CustomTableResizableCell
      onResized={props.onResize}
      className="text-nowrap relative py-4 px-2 font-semibold text-text-secondary text-base"
      rowSpan={!config.groupedHeaderLabel && hasGroupedHeaderLabel ? 2 : 1}
      colSpan={
        !config.groupedHeaderLabel
          ? 1
          : configs.filter(
              (c) => c.groupedHeaderLabel == config.groupedHeaderLabel
            ).length
      }
      align={!config.groupedHeaderLabel ? undefined : "center"}
      disableResize
    >
      {config.groupedHeaderLabel || (
        <CustomTableSortLabel
          active={sortModel?.key == config.key}
          direction={sortModel?.key == config.key ? sortModel.direction : "asc"}
          onClick={() => onClickSort?.(config.key)}
          className="w-full"
        >
          <div className="flex items-center gap-1">
            {config.headerIcon}
            <div>{config.headerLabel}</div>
          </div>
        </CustomTableSortLabel>
      )}
    </CustomTableResizableCell>
  );
}
