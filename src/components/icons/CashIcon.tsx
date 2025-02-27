import * as React from "react"

function CashIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={52}
      height={40}
      viewBox="0 0 52 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M51 1.771H1v30h50v-30zM48.917 31.98H3.084v3.125h45.833V31.98z"
        stroke="#FCFEFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46.833 35.105H5.166v3.125h41.667v-3.125zM25.748 28.06c4.44 0 8.04-4.953 8.04-11.062 0-6.108-3.6-11.06-8.04-11.06-4.44 0-8.039 4.952-8.039 11.06 0 6.11 3.6 11.061 8.04 11.061z"
        stroke="#FCFEFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M9.985 28.06h32.031c0-3.055 2.39-5.531 5.339-5.531V11.468c-2.949 0-5.339-2.476-5.339-5.53H9.985c0 3.054-2.39 5.53-5.339 5.53v11.06c2.949 0 5.339 2.477 5.339 5.531z"
        stroke="#FCFEFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.183 18.579c.833 0 1.508-.708 1.508-1.58 0-.873-.675-1.58-1.508-1.58-.832 0-1.507.707-1.507 1.58 0 .872.675 1.58 1.507 1.58zM38.812 18.579c.833 0 1.507-.708 1.507-1.58 0-.873-.675-1.58-1.507-1.58-.832 0-1.507.707-1.507 1.58 0 .872.675 1.58 1.507 1.58z"
        stroke="#FCFEFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CashIcon
