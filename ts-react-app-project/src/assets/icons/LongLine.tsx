import { SVGProps } from "react"
const LongIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={2}
        height={40}
        viewBox="0 0 2 40"
        fill="none"
        {...props}
    >
        <path opacity={0.54} d="M1 0V40" stroke="white" strokeOpacity={0.32} />
    </svg>
)
export default LongIcon;