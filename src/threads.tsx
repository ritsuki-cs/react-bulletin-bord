import { Link } from 'react-router-dom';
import { useGetThread } from './api';


export function Threads() {
  const { threads, beforeList, nextList } = useGetThread()

  if (!threads) {
    return (
      // ローディングの描画を書く
      <div className='title-loading'>Now Loading ...</div>
    )
  }

  return (
    <div className="Threads">
      <div className="title">新着スレッド</div>
      <table className="thread-list">
        {threads.map((data) => (
          <tr>
            <td>
              <Link to={'/thread/' + data.id} className="thread-link" state={data.title} >{data.title}</Link>
            </td>
          </tr>
        ))}
      </table>
      <div className="buttons">
        <button onClick={beforeList}>前の10件</button>
        <button onClick={nextList} className="button-right">
          次の10件
        </button>
      </div>
    </div>
  )
}