import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
import Link from "next/link"

export default function Avatar({ user, size = 36 }) {
    return (
        <Link
            href="/profile"
            className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 border-border hover:border-foreground transition-colors"
            aria-label="User Profile"
        >
            {user?.image ? (
                <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={size}
                    height={size}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <FiUser className="text-muted-foreground" size={size / 2} />
                </div>
            )}
        </Link>
    );
}