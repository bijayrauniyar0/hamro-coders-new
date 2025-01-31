import { FlexColumn } from '@Components/common/Layouts';
import SubjectRow from './SubjectRow';
import { ISubjects } from '@Constants/Types/academics';
import SubjectBox from './SubjectBox';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import { useTypedDispatch } from '@Store/hooks';
import { setIsModesOpen } from '@Store/actions/common';
import { useParams } from 'react-router-dom';
import { getStyle } from '@Utils/index';
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

  function getComponentAccordingToStyle(key: number, subject: ISubjects) {
    switch (selectedStyle) {
      case 'list':
        return (
          <SubjectRow
            key={key}
            courseDetails={subject}
            handlePlay={() => {
              dispatch(setIsModesOpen(true));
              handlePlay(subject.subject_code);
            }}
          />
        );
      case 'grid':
        return (
          <SubjectBox
            key={key}
            courseDetails={subject}
            handlePlay={() => {
              dispatch(setIsModesOpen(true));
              handlePlay(subject.subject_code);
            }}
          />
        );
      default:
        return null;
    }
  }

  return (
    <FlexColumn className="gap-4">
      <motion.div
        className={getStyle(selectedStyle)}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {courseDetails?.map((semester, index) => {
          return (
            <motion.div
              variants={cardVariants}
              key={`${semester.subject_code}-${courseName}`}
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
