import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import TopBox from './TopBox';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@Services/common';

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: getAllUsers,
    select: res => res.data,
  });
  return (
    <FlexColumn className="w-full gap-2 !mt-[8rem]">
      {/* {data?.map((user: any) => (
        <FlexRow key={user.id} className='gap-4'>
          <p className='text-xl text-primary-700'>{user.id}</p>
          <p className='text-xl text-primary-700'>{user.email}</p>
          <p className='text-xl text-primary-700'>{user.name}</p>
        </FlexRow>
      ))} */}
      {/* <TopBox /> */}
    </FlexColumn>
  );
};

export default Dashboard;
