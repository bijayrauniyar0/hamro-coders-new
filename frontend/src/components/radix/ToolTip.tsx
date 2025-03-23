import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Arrow,
  Portal,
} from '@radix-ui/react-tooltip';
import Icon from '../common/Icon';

interface ToolTipProps {
  name: string;
  message: string;
  className?: string;
  messageStyle?: string;
  iconClick?: () => void;
  preventDefault?: boolean;
}

export default function ToolTip({
  name,
  message,
  iconClick,
  className = 'text-grey-500 hover:text-black',
  messageStyle,
  preventDefault = true,
}: ToolTipProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={e => {
              if (preventDefault) {
                e.preventDefault();
              }
              if (iconClick) iconClick();
            }}
          >
            <Icon name={name} className={`${className}`} />
          </TooltipTrigger>
          <Portal>
            <TooltipContent sideOffset={5} className="z-50">
              <div
                className={`message rounded-sm bg-primary-700 px-3 py-1 text-xs font-semibold text-white ${messageStyle}`}
              >
                {message}
              </div>
              <Arrow
                className="TooltipArrow rounded"
                style={{ fill: '#417EC9' }}
              />
            </TooltipContent>
          </Portal>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
