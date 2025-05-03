import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DoorOpen, Expand, GridIcon, Minimize } from 'lucide-react';

import BindContentContainer from '@Components/common/BindContentContainer';
import { ConfirmationDialog } from '@Components/common/Confirmation';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import isEmpty from '@Utils/isEmpty';

import { useMCQContext } from './Context/MCQContext';
import QuestionsViewButtons from './QuestionsView/Buttons';
import ResultsViewButtons from './ResultsView/Buttons';
import InstructionsView from './InstructionsView';
import MCQSkeleton from './MCQSkeleton';
import OverviewMode from './OverviewMode';
import QuestionsView from './QuestionsView';
import ResultsView from './ResultsView';
import TimeBox from './TimeBox';

const questionsIsLoading = false;

const MCQBox = () => {
  const {
    questionsChunk,
    mcqData,
    viewMode,
    visibleQuestionChunkIndex,
    solvedCount,
  } = useMCQContext();
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { course_id } = useParams();
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const handleBeforeUnload = useRef((event: BeforeUnloadEvent) => {
  //   event.preventDefault();
  // });

  // useEffect(() => {
  //   const listener = handleBeforeUnload.current;

  //   window.addEventListener('beforeunload', listener);

  //   return () => {
  //     window.removeEventListener('beforeunload', listener);
  //   };
  // }, []);

  // const disableBeforeUnload = () => {
  //   window.removeEventListener('beforeunload', handleBeforeUnload.current);
  // };

  const getViewModes = (view: string) => {
    switch (view) {
      case 'questions':
      case 'answers':
        return <QuestionsView />;
      case 'results':
        return <ResultsView />;
      case 'instructions':
        return <InstructionsView />;
      default:
        return <></>;
    }
  };
  const getButtonsAccordingToViews = (view: string) => {
    switch (view) {
      case 'questions':
      case 'answers':
        return <QuestionsViewButtons />;
      case 'results':
        return <ResultsViewButtons />;
      default:
        return <></>;
    }
  };

  const handleFullScreen = () => {
    if (fullScreenRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
      } else {
        fullScreenRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };
  return (
    <div ref={fullScreenRef} className="bg-white">
      <BindContentContainer>
        <div className="flex w-full items-center justify-center">
          <div className="relative mx-auto h-[calc(100dvh-2.5rem)] w-full overflow-hidden rounded-lg border bg-white p-4 shadow-lg md:h-[calc(100dvh-4rem)] md:w-4/5 md:p-4">
            {questionsIsLoading || !mcqData || isEmpty(mcqData) ? (
              <MCQSkeleton />
            ) : (
              <FlexColumn className="items-end gap-3 md:gap-5">
                <div className="flex w-full flex-wrap justify-between border-b border-gray-300 pb-4">
                  <p className="text-md font-semibold text-primary-600 lg:text-lg">
                    Hamro Coders
                  </p>

                  <FlexRow className="items-center justify-between gap-4 max-sm:w-full md:justify-end">
                    <p className="text-sm text-gray-500 md:text-md">
                      Exam: Computer Science
                    </p>
                    <TimeBox />
                  </FlexRow>
                </div>
                <FlexRow className="z-10 w-full items-center justify-between gap-4 bg-white">
                  <FlexRow className="items-center gap-6">
                    {isOverviewOpen ? (
                      <span className="text-sm font-medium md:text-md">
                        Section {visibleQuestionChunkIndex + 1}/
                        {questionsChunk.length}
                      </span>
                    ) : (
                      <FlexRow className="items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <p className="text-xs text-gray-700 md:text-sm">
                          {solvedCount}/{mcqData.questions_count} Solved
                        </p>
                      </FlexRow>
                    )}
                  </FlexRow>
                  <FlexRow className="items-center gap-2">
                    <ConfirmationDialog
                      description="Are you sure you want to leave the exam?"
                      confirmText="Leave"
                      triggerChildren={
                        <div className="rounded-md bg-red-400 p-1">
                          <DoorOpen className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5" />
                        </div>
                      }
                      handleConfirm={() =>
                        navigate(`/courses/subjects/${course_id}`)
                      }
                    />

                    <div className="rounded-md bg-blue-400 p-1">
                      {isFullScreen ? (
                        <Minimize
                          onClick={() => {
                            handleFullScreen();
                          }}
                          className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5"
                        />
                      ) : (
                        <Expand
                          onClick={() => {
                            handleFullScreen();
                          }}
                          className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5"
                        />
                      )}
                    </div>
                    <button
                      disabled={
                        viewMode === 'instructions' || viewMode === 'results'
                      }
                      onClick={() => {
                        setIsOverviewOpen(!isOverviewOpen);
                      }}
                      className={`flex items-center disabled:cursor-not-allowed gap-1 disabled:hover:text-white disabled:text-white rounded-md px-2 py-[0.325rem] text-xs text-primary-600 hover:bg-primary-500 hover:text-white md:text-sm ${isOverviewOpen ? 'bg-primary-500 text-white' : 'border border-gray-300 bg-white'} disabled:bg-gray-300`}
                    >
                      <GridIcon size={14} />
                      Overview
                    </button>
                  </FlexRow>
                </FlexRow>
                <FlexColumn className="w-full gap-2">
                  <motion.div
                    layout // This enables smooth layout transitions based on content size
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isOverviewOpen ? 'auto' : 0,
                      opacity: isOverviewOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full overflow-hidden"
                  >
                    <OverviewMode />
                  </motion.div>

                  <motion.div
                    layout
                    animate={{ y: isOverviewOpen ? 0 : -16 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="max-md:scrollbar-thin h-[calc(100dvh-15rem)] w-full overflow-hidden overflow-y-auto md:h-[calc(100dvh-19rem)]"
                  >
                    {getViewModes(viewMode)}
                  </motion.div>
                </FlexColumn>

                <div className="sticky bottom-0 w-full bg-white">
                  {getButtonsAccordingToViews(viewMode)}
                </div>
              </FlexColumn>
            )}
          </div>
        </div>
      </BindContentContainer>
    </div>
  );
};

export default MCQBox;
