import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const useAuth = () => {
  const { tokens, user } = useSelector((state: RootState) => state.auth);

  return {
    loggedIn: !!tokens.accessToken,
    account: user,
    tokens,
  };
};

export default useAuth;
