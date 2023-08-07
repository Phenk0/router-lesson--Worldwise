import Button from './Button.jsx';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      type="back"
    >
      ⬅ Back
    </Button>
  );
}

export default BackButton;
