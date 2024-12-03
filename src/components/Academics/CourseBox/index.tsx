import { FlexColumn } from '@Components/common/Layouts';
import SubjectRow from './SubjectRow';
import { ISubjects } from '@Constants/Types/academics';
import SubjectBox from './SubjectBox';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import { useTypedDispatch } from '@Store/hooks';
import { setIsModesOpen } from '@Store/actions/common';
export interface ICourse {
  semester: string;
  semesterNumber: number;
  subjects: ISubjects[];
}

interface ICourseBoxProps {
  courseDetails: ISubjects[];
  selectedStyle: string;
  img?: string;
  courseName?: string;
}

const CourseBox = ({ courseDetails, selectedStyle }: ICourseBoxProps) => {
  const dispatch = useTypedDispatch();
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
  function getComponentAccordingToStyle(key: number, semester: ISubjects) {
    switch (selectedStyle) {
      case 'list':
        return (
          <SubjectRow
            key={key}
            courseDetails={semester}
            handlePlay={() => dispatch(setIsModesOpen(true))}
          />
        );
      default:
        return (
          <SubjectBox
            key={key}
            courseDetails={semester}
            handlePlay={() => dispatch(setIsModesOpen(true))}
          />
        );
    }
  }

  return (
    // <FlexColumn className="gap-4">
    //   <FlexRow className="items-center justify-between">
    //     <p className="text-lg font-bold">{courseName}</p>
    //     <FlexRow className="items-center gap-2">
    //       <ToolTip
    //         name="grid_view"
    //         message="Show Grid View"
    //         iconClick={() => setSelectedStyle('grid')}
    //         className={`${selectedStyle === 'grid' ? '!bg-secondary-100 rounded-sm p-1' : ''} flex items-center justify-center min-w-[2rem]`}
    //       />
    //       <ToolTip
    //         name="view_list"
    //         message="Show List View"
    //         iconClick={() => setSelectedStyle('list')}
    //         className={`${selectedStyle === 'list' ? '!bg-secondary-100 rounded-sm p-1' : ''} flex items-center justify-center min-w-[2rem]`}
    //       />
    //       <Select
    //         options={semestersData || []}
    //         placeholder="Select"
    //         className="!z-0 h-8 !w-[11.25rem] rounded !border border-[#D0D5DD] bg-white"
    //         valueKey="value"
    //         selectedOption={+selectedOption}
    //         onChange={value => {
    //           setSelectedOption(value);
    //           const filteredSemesterData = courseDetails.filter(
    //             semesterX => semesterX.semesterNumber === +value,
    //           );
    //           setFilteredlist(filteredSemesterData[0].subjects);
    //         }}
    //       />
    //     </FlexRow>
    //   </FlexRow>
    //   <div className={getStyle()}>
    //     {filteredList.map((semester, index) => {
    //       return <SubjectBox key={index} courseDetails={semester} />;
    //     })}
    //   </div>
    // </FlexColumn>
    <FlexColumn className="gap-4">
      <motion.div
        className={getStyle()}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {courseDetails?.map((semester, index) => {
          return (
            <motion.div variants={cardVariants} key={semester.subjectCode}>
              {getComponentAccordingToStyle(index, semester)}
            </motion.div>
          );
        })}
      </motion.div>
    </FlexColumn>
  );
};

export default CourseBox;
