import * as React from "react"

function CalendarIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={52}
      height={52}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M49.438 1H2.562C1.7 1 1 1.7 1 2.563v46.874C1 50.3 1.7 51 2.563 51h46.874C50.3 51 51 50.3 51 49.437V2.563C51 1.7 50.3 1 49.437 1z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16H6v10h10V16zM26 16H16v10h10V16zM36 16H26v10h10V16zM46 16H36v10h10V16zM46 26H36v10h10V26zM36 26H26v10h10V26zM26 26H16v10h10V26zM16 26H6v10h10V26zM16 36H6v10h10V36zM26 36H16v10h10V36zM36 36H26v10h10V36z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M11 1h5v2.5C16 4.88 14.878 6 13.5 6 12.12 6 11 4.878 11 3.5V1zM36 1h5v2.5C41 4.88 39.878 6 38.5 6 37.12 6 36 4.878 36 3.5V1z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CalendarIcon
