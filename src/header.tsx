import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="Header">
      <div>
        <Link to="/" className='header-title'>掲示板</Link>
      </div>
      <div className="header-link">
        <Link to="thread/new">スレッドをたてる</Link>
      </div>
    </header>
  )
}