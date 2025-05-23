import * as React from 'react';

function AvatarCompanyIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={36}
      height={36}
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <rect
        x={0.75}
        y={0.75}
        width={34.5}
        height={34.5}
        rx={17.25}
        fill='url(#pattern0_251_6481)'
      />
      <rect
        x={0.75}
        y={0.75}
        width={34.5}
        height={34.5}
        rx={17.25}
        stroke='#fff'
        strokeWidth={1.5}
      />
      <defs>
        <pattern
          id='pattern0_251_6481'
          patternContentUnits='objectBoundingBox'
          width={1}
          height={1}
        >
          <use xlinkHref='#image0_251_6481' transform='scale(.00313)' />
        </pattern>
        <image
          id='image0_251_6481'
          width={320}
          height={320}
          preserveAspectRatio='none'
          xlinkHref='data:image/jpeg;base64,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'
        />
      </defs>
    </svg>
  );
}

export default AvatarCompanyIcon;
