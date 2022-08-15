import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="Header">
      <div>掲示板</div>
      <div className="header-link">
        <Link to="thread/new">スレッドをたてる</Link>
      </div>
    </header>
  )
}