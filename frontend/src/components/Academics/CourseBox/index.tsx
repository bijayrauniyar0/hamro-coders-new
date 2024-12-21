import { FlexColumn } from '@Components/common/Layouts';
import SubjectRow from './SubjectRow';
import { ISubjects } from '@Constants/Types/academics';
import SubjectBox from './SubjectBox';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import { useTypedDispatch } from '@Store/hooks';
import { setIsModesOpen } from '@Store/actions/common';
import { useParams } from 'react-router-dom';
export interface ICourse {
  semester: string;
  semesterNumber: number;
  subjects: ISubjects[];
}

interface ICourseBoxProps {
  courseDetails: ISubjects[];
  selectedStyle: string;
  img?: string;
  // eslint-disable-next-line no-unused-vars
  handlePlay: (subjectCode: string) => void;
}

const CourseBox = ({
  courseDetails,
  selectedStyle,
  handlePlay,
}: ICourseBoxProps) => {
  const dispatch = useTypedDispatch();
  const { courseName } = useParams();
  function getStyle() {
    switch (selectedStyle) {
      case 'grid':
        return 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5';
      case 'list':
        return 'flex flex-col gap-4 w-full';
      default:
        return 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5';
    }
  }
  function getComponentAccordingToStyle(key: number, subject: ISubjects) {
    switch (selectedStyle) {
      case 'list':
        return (
          <SubjectRow
            key={key}
            courseDetails={subject}
            handlePlay={() => {
              dispatch(setIsModesOpen(true));
              handlePlay(subject.subjectCode);
            }}
          />
        );
      default:
        return (
          <SubjectBox
            key={key}
            courseDetails={subject}
            handlePlay={() => {
              dispatch(setIsModesOpen(true));
              handlePlay(subject.subjectCode);
            }}
          />
        );
    }
  }

  return (
    <FlexColumn className="gap-4">
      <motion.div
        className={getStyle()}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {courseDetails?.map((semester, index) => {
          return (
            <motion.div
              variants={cardVariants}
              key={`${semester.subjectCode}-${courseName}`}
            >
              {getComponentAccordingToStyle(index, semester)}
            </motion.div>
          );
        })}
      </motion.div>
    </FlexColumn>
  );
};

export default CourseBox;
