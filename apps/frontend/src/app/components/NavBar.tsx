import { links } from '../items';
import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="flex flex-row justify-center items-center p-4 text-white bg-gray-800 ">
      <nav>
        <ul className="flex flex-row gap-5">
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
