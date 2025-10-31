import toast from 'react-hot-toast';
import { Button } from './Button';

export default function confirmToast(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    toast((t) => (
      <div>
        <p>{message}</p>
        <div className='flex gap-2 mt-2'>
          <Button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
            variant='danger'
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
          >
            No
          </Button>
        </div>
      </div>
    ));
  });
}
