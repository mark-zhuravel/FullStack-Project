import { SVGProps } from "react"
const ShortLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={2}
    height={20}
    viewBox="0 0 2 20"
    fill="none"
    {...props}
  >
    <path d="M1 0V20" stroke="white" strokeOpacity={0.5} />
  </svg>
)
export default ShortLine;