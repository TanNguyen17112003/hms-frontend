import React, { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import clsx from "clsx";
import { SideNavItem } from "./side-nav-item";
import { Divider } from "@mui/material";

interface DashboardItem {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: DashboardItem[];
  label?: ReactNode;
  path?: string;
  title: string;
}

const renderItems = ({
  depth = 0,
  items,
  pathname,
}: {
  depth?: number;
  items: DashboardItem[];
  pathname?: string | null;
}): JSX.Element[] =>
  items.reduce(
    (acc: JSX.Element[], item) =>
      reduceChildRoutes({
        acc,
        depth,
        item,
        pathname,
      }),
    []
  );

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  pathname,
}: {
  acc: JSX.Element[];
  depth: number;
  item: DashboardItem;
  pathname?: string | null;
}): Array<JSX.Element> => {
  const checkPath = !!(item.path && pathname);
  const partialMatch = checkPath ? pathname?.includes(item.path || "$") : false;
  const exactMatch = checkPath ? pathname === item.path : false;

  if (item.items) {
    acc.push(
      <SideNavItem
        active={partialMatch}
        depth={depth}
        disabled={item.disabled}
        icon={item.icon}
        key={item.title}
        label={item.label}
        open={true}
        title={item.title}
      >
        <ul className="flex flex-col">
          {renderItems({
            depth: depth + 1,
            items: item.items,
            pathname,
          })}
        </ul>
      </SideNavItem>
    );
  } else {
    acc.push(
      <SideNavItem
        active={exactMatch}
        depth={depth}
        disabled={item.disabled}
        external={item.external}
        icon={item.icon}
        key={item.title}
        label={item.label}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

interface SideNavSectionProps {
  items?: DashboardItem[];
  pathname?: string | null;
  subheader?: string;
  isLast?: boolean;
}

export const SideNavSection: FC<SideNavSectionProps> = (props) => {
  const { items = [], pathname, subheader = "" } = props;

  return (
    <>
      <ul className="list-none p-0 m-0">
        {renderItems({ items, pathname })}
      </ul>
      {!props.isLast && <Divider />}
    </>
   
  );
};

SideNavSection.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  subheader: PropTypes.string,
};
