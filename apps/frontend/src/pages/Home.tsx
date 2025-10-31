import type { UserResponseDTO } from 'booking-backend';
import { TbReportMoney } from 'react-icons/tb';
import { FaRegCalendarAlt, FaRegListAlt, FaUsers } from 'react-icons/fa';
import { Button } from '../components/Button';
interface HomeProps {
  user: UserResponseDTO | undefined;
}

export default function Home({ user }: HomeProps) {
  if (!user)
    return (
      <p className='text-2xl text-center mt-5'>Please log in to continue</p>
    );
  const isStudent = user.role === 'USER';
  return (
    <article className='flex flex-col items-center gap-10 px-8'>
      <h1 className='text-2xl mt-10'>Welcome to Yoga Studio App</h1>
      <div className='flex flex-wrap gap-10 justify-center md:gap-15'>
        {isStudent && (
          <Button className='flex flex-col gap-5 justify-center py-5 px-10 w-50 text-lg md:text-xl active:scale-95 transition-transform'>
            <TbReportMoney size={70} />
            <b>MY PAYMENTS</b>
          </Button>
        )}
        <Button
          variant='primary'
          className='flex flex-col gap-5 justify-center py-5 px-10 w-50 text-lg md:text-xl active:scale-95 transition-transform'
        >
          <FaRegCalendarAlt size={70} />
          <b>CLASS SCHEDULE</b>
        </Button>
        {isStudent && (
          <Button className='flex flex-col gap-5 justify-center py-5 px-10 w-50 text-lg md:text-xl active:scale-95 transition-transform'>
            <FaRegListAlt size={70} />
            <b>MY BOOKINGS</b>
          </Button>
        )}
        {!isStudent && (
          <Button className='flex flex-col gap-5 justify-center py-5 px-10 w-50 text-lg md:text-xl active:scale-95 transition-transform'>
            <FaUsers size={70} />
            <b>USERS MANAGEMENT</b>
          </Button>
        )}
      </div>
    </article>
  );
}
