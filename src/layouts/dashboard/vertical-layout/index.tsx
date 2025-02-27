import React, { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Section } from "../config/config";
import { SideNav } from "./side-nav";
import { NavColor } from "src/types/settings";

const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;

  return (
    <div className="flex px-5 py-3">
      <SideNav color={navColor} sections={sections} />
      <div
        className={`flex-1 flex flex-col`}
        style={{ paddingLeft: 480 }}
      >
        {children}
      </div>
    </div>
  );
};

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

VerticalLayout.propTypes = {
  children: PropTypes.any,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  sections: PropTypes.array,
};

export default VerticalLayout;
