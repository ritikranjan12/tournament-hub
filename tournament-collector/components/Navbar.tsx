import Image from 'next/image';
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Image src="https://img.freepik.com/free-vector/detailed-esports-gaming-logo_52683-63633.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1711756800&semt=ais" alt="logo" width={40} height={40} />
                        <Link href={`/`}><span className='text-xl text-white mx-2'>Tournament Registration Hub</span>
                    </Link></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
