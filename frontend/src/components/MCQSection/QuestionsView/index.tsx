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
  const {
    questionsChunk,
    selectedOption,
    setSelectedOption,
    openAccordion,
    visibleQuestionChunkIndex,
    setOpenAccordion,
  } = useMCQContext();
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
        if (value) setOpenAccordion(value);
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
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <AccordionTrigger
                className={`grid min-w-full grid-cols-[1fr_2rem] gap-2 p-2 ${isAccordionOpen ? 'border-b bg-gray-100' : 'border-0 opacity-50'} transition-all duration-200 ease-in-out hover:no-underline hover:opacity-100`}
              >
                <FlexRow className="items-center gap-2">
                  <p className="text-md font-semibold md:text-base">
                    Q
                    {getGlobalIndex(
                      questionsChunk,
                      visibleQuestionChunkIndex,
                      questionIndex,
                    ) + 1}
                  </p>{' '}
                  <p className="text-justify text-sm font-normal leading-4 md:text-md md:leading-[1.15rem]">
                    {question.question}
                  </p>
                </FlexRow>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid select-none grid-cols-1 gap-2 px-2 py-4 md:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isOptionSelected =
                      selectedOption[question.id]?.answer === option.id;
                    return (
                      <MCQButton
                        label={optionsLabel[optionIndex]}
                        value={option.value}
                        onClick={() =>
                          setSelectedOption(prevSelections => {
                            return {
                              ...prevSelections,
                              [question.id]: {
                                answer: option.id,
                                section_id: question.section_id,
                              },
                            };
                          })
                        }
                        isOptionSelected={isOptionSelected}
                        key={`${question.id}-${option.id}`}
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

export default QuestionsView;
