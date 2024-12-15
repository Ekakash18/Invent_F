/* eslint-disable react/function-component-definition */
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ children, className }) {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    return <button className={className} onClick={() => handleLogout()}>{children}</button>;
}