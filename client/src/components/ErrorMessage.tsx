import { useEffect } from 'react';
import '../styles/message.css';

interface Props {
  message: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ErrorMessage: React.FC<Props> = ({ message, visible, setVisible }) => {

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [visible, setVisible]);

  return (
    <div className={`dialog  fixed top-4 left-1/3 right-1/3 p-4 mb-4 font-semibold -text--color-red -bg--color-light-red -border--color-red border-2 rounded-lg ${visible ? 'visible' : 'hidden'} z-50`} role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;