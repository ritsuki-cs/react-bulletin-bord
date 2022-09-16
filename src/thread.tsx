import { Link } from 'react-router-dom'
import { useGetPost, usePostPost } from './api'

export const Thread = () => {
  const { thread, beforeList, nextList } = useGetPost();
  const { register, handleSubmit, onSubmit } = usePostPost();


  if (!thread) {
    return (
      // ローディング画面
      <div className="title-loading">Now Loading ...</div>
    )
  }

  const posts = thread.posts;

  return (
    <div className="Thread">
      <div className="title">{thread.title}</div>
      <div className="contents">
        <div className="post-list">
          <table>
            {posts.map((data) => (
              <tr>
                <td className="td-id">{data.id}</td>
                <td className="td-post">{data.post}</td>
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
        <div className="new-post">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              placeholder="投稿しよう！"
              {...register('post')}
              className="new-post-input"
            />
            <div className='new-post-links'>
              <Link to="/" className="link-top">
                Topに戻る
              </Link>
              <input type="submit" value="投稿" className="new-post-button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
