import { SVGProps } from "react"
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g stroke="#fff" strokeWidth={2} opacity={0.5}>
      <path d="M1 15 15 1M1 1l14 14" />
    </g>
  </svg>
)
export default CloseIcon;