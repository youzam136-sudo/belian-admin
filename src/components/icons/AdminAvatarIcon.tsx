import { useId, type SVGProps } from "react";

/** 기본 프로필(관리자/운영진) 아바타 아이콘 */
export function AdminAvatarIcon(props: SVGProps<SVGSVGElement>) {
  const clipId = useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 43" {...props}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="21.5" cy="21.5" r="21.5" fill="#f1f2f4" />
        </clipPath>
      </defs>
      <circle cx="21.5" cy="21.5" r="21.5" fill="#f1f2f4" />
      <g clipPath={`url(#${clipId})`}>
        <ellipse
          cx="8.5"
          cy="8"
          rx="8.5"
          ry="8"
          transform="translate(13 10)"
          fill="#dfdfdf"
        />
        <ellipse
          cx="16.5"
          cy="19"
          rx="16.5"
          ry="19"
          transform="translate(5 26)"
          fill="#dfdfdf"
        />
      </g>
    </svg>
  );
}
