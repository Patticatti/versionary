export default function FigTailwind() {
  return (
    <div className="max-w-[400px] border-x-0 border-t-0 border-b border-black pl-0 pr-2 flex justify-between items-center self-stretch relative w-full h-10 bg-white">
      <div className="pl-5 pr-0 flex gap-2 items-center relative">
        <div className="overflow-hidden rounded relative w-4 h-4 bg-black">
          <img
            src="https://picsum.photos/id/32/16/16"
            className="w-4 h-4 bg-[url('https://picsum.photos/id/72/16/16')]"
          />
        </div>
        <small className="text-xs leading-[14px] tracking-[-0.02em] text-black/[87%]">
          <span className="text-black/[87%] text-xs tracking-[-0.02em] font-medium">
            Figma to React
          </span>
        </small>
      </div>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
          stroke="black"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
