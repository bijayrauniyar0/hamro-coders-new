import React, { useEffect } from 'react';

import { FlexRow } from '@Components/common/Layouts';
import { useMCQContext } from '@Components/MCQSection/Context/MCQContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@Components/radix/Accordion';
import { getGlobalIndex } from '@Utils/index';
import { optionsLabel } from '@Constants/QuestionsBox';

import MCQButton from '../MCQButton';

const QuestionsView = () => {
  const [openAccordion, setOpenAccordion] = React.useState<string>('');
  const {
    questionsChunk,
    selectedOption,
    setSelectedOption,
    visibleQuestionChunkIndex,
    viewMode,
    evaluatedAnswers,
  } = useMCQContext();

  useEffect(() => {
    const firstId = questionsChunk[visibleQuestionChunkIndex]?.[0]?.id;
    if (firstId) setOpenAccordion(firstId.toString());
  }, [visibleQuestionChunkIndex, questionsChunk]);

  return (
    <Accordion
      type="single"
      collapsible
      value={openAccordion}
      defaultValue={questionsChunk[
        visibleQuestionChunkIndex
      ]?.[0]?.id.toString()}
      className="flex w-full flex-col gap-4"
      onValueChange={value => {
        setOpenAccordion(value);
      }}
    >
      {questionsChunk[visibleQuestionChunkIndex].map(
        (question, questionIndex) => {
          const isAccordionOpen = question.id.toString() === openAccordion;
          return (
            <AccordionItem
              value={question.id.toString()}
              key={question.id}
              className={`!rounded-md border transition-all duration-200 ease-in-out ${
                isAccordionOpen
                  ? 'border-gray-300'
                  : 'hover:border-primary-600 border-gray-300'
              }`}
            >
              <AccordionTrigger
                className={`relative min-w-full !overflow-hidden p-2 ${isAccordionOpen ? 'border-b bg-gray-100' : 'border-0 opacity-50'} rounded-t-md transition-all duration-200 ease-in-out hover:no-underline hover:opacity-100`}
              >
                {selectedOption[question.id]?.answer && (
                  <div className="absolute left-[-0.675rem] top-[-0.685rem] h-7 w-5 rotate-45 bg-green-400" />
                )}
                <FlexRow
                  className={`items-start justify-start gap-2 ${isAccordionOpen ? 'w-full' : 'w-4/5'}`}
                >
                  <p className="h-fit w-fit text-md font-semibold leading-4 md:text-base md:leading-[1.15rem]">
                    Q
                    {getGlobalIndex(
                      questionsChunk,
                      visibleQuestionChunkIndex,
                      questionIndex,
                    ) + 1}
                  </p>{' '}
                  <p
                    className={`max-w-fit text-start text-sm font-normal leading-4 md:text-md md:leading-[1.15rem] ${isAccordionOpen ? '' : 'truncate'}`}
                  >
                    {question.question}
                  </p>
                </FlexRow>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid select-none grid-cols-1 gap-2 px-2 py-4 md:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isOptionSelected =
                      selectedOption[question.id]?.answer === option.id;
                    let correctAnswer = 0;
                    if (evaluatedAnswers && viewMode === 'answers') {
                      correctAnswer =
                        evaluatedAnswers[question.id]?.correctAnswer;
                    }
                    return (
                      <MCQButton
                        label={optionsLabel[optionIndex]}
                        value={option.value}
                        onClick={() => {
                          if (viewMode === 'answers') return;
                          setSelectedOption(prevSelections => {
                            return {
                              ...prevSelections,
                              [question.id]: {
                                answer: option.id,
                                section_id: question.section_id,
                              },
                            };
                          });
                        }}
                        isOptionSelected={isOptionSelected}
                        key={`${question.id}-${option.id}`}
                        isAnswerCorrect={correctAnswer === option.id}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        },
      )}
    </Accordion>
  );
};

export default React.memo(QuestionsView);
