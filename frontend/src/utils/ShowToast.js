import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type = 'info', message = '') => {
  const options = {
    autoClose: 3000,
    position: 'top-center',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    style: {
      fontSize: '16px',
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
  }
};

export default showToast;
