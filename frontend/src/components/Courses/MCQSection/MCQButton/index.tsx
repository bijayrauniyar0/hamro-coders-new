import buttonPng from '@Assets/images/button.png';

type MCQButtonProps = {
  value: string;
  label: string;
};
const MCQButton = ({ value, label }: MCQButtonProps) => {
  return (
    <>
      <div className="relative">
        <img src={buttonPng} className="max-h-[3rem] max-w-[3rem]" />
        <p className="left absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-white">
          {label}
        </p>
      </div>
      <p className="text-sm leading-4 lg:text-base">{value}</p>
    </>
  );
};

export default MCQButton;
