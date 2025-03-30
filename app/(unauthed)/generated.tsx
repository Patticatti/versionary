export default function Bruh() {
  return (
    <div className="flex w-91 flex-col items-start rounded-[13px]  border border-[rgba(0,0,0,0.08)] bg-[#FFF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05),0px_8px_16px_-4px_rgba(0,0,0,0.25)]overflow-hidden">
      <div className="flex h-10 pr-2 justify-between items-center self-stretch bg-[#FFF]">
        <div className="flex pl-5 pr-5 items-center gap-2">
          <div className="flex w-4 h-4 justify-center items-center rounded-sm bg-[#000] overflow-hidden">
            <div className="w-4 h-4 bg-[url(<path-to-image>) lightgray 50% / cover no-repeat]"></div>
          </div>
          <div className="text-[rgba(0, 0, 0, 0.87)] font-inter text-xs font-medium leading-normal tracking-[-0.24px]">
            Figma to React
          </div>
        </div>
        <div className="w-[18px] h-[18px] overflow-hidden">
          <div className="w-[9px] h-[9px]"></div>
        </div>
      </div>
      <div className="flex py-6 px-8 pl-6 pr-6 flex-col items-start gap-6 self-stretch">
        <div className="flex py-6 px-0  pl-6 pr-6 justify-center items-center gap-6 self-stretch rounded-tl-xl rounded-tr-sm rounded-br-xs rounded-bl-0  bg-[rgba(240, 242, 245, 0.50)]">
          <div className="w-[33px] h-[50px] bg-[url(<path-to-image>) lightgray 50% / cover no-repeat]"></div>
          <div className="w-[35.489px] h-8"></div>
          <div className="w-[77px] h-[69px] bg-[url(<path-to-image>) lightgray 50% / cover no-repeat]"></div>
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="self-stretch text-[#000] font-plus-jakarta-sans text-sm font-medium leading-[1.5em] tracking-[-0.14px]">
            Select a frame
          </div>
          <div className="flex py-2 px-0  pl-2 pr-2 justify-center items-center gap-[10px] self-stretch rounded-md bg-[#F0F2F5] overflow-hidden">
            <div className="text-[#8B909B] font-inter text-sm font-medium leading-normal tracking-[-0.28px]">
              Convert Selection to React
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
