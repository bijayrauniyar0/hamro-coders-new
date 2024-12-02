import { FlexColumn } from '@Components/common/Layouts';

const TopBox = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <FlexColumn className="col-span-5">
          <p className="text-[4rem] font-bold leading-[3.75rem] text-black">
            Conquer the <br />
            Leaderboard !!
          </p>
        </FlexColumn>
        <FlexColumn className="col-span-7"></FlexColumn>
      </div>
    </>
  );
};

export default TopBox;
