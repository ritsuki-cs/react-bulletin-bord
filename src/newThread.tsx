import { Link } from 'react-router-dom';
import { usePostThread } from './api';

export function NewThread() {
  const { register, handleSubmit, onSubmit } = usePostThread();

  return (
    <div className="NewThread">
      <div className="title">スレッド新規作成</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-thread">
          <input type="text" placeholder="スレッドタイトル" {...register('title')} className="input-thread"/>
        <div>
          <Link to="/" className='link-thread'>Topに戻る</Link>
          <input type="submit" value="作成" className='button-thread'/>
        </div>
      </form>
    </div>
  )
}