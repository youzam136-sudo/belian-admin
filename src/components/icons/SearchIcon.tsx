import type { SVGProps } from "react";

/** 검색(돋보기) 아이콘 */
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.605 18.141"
      {...props}
    >
      <path
        d="M15.605,7.8a7.8,7.8,0,1,0-7.8,7.8,7.7,7.7,0,0,0,3.775-1.017l2.192,3.265a.646.646,0,0,0,.538.287.639.639,0,0,0,.361-.11.647.647,0,0,0,.177-.9l-2.192-3.266A7.759,7.759,0,0,0,15.605,7.8M1.3,7.8A6.507,6.507,0,1,1,7.8,14.31,6.515,6.515,0,0,1,1.3,7.8"
        fill="currentColor"
      />
    </svg>
  );
}
