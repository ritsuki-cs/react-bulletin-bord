import { Link } from 'react-router-dom';
import { usePostThread } from './api';

export function NewThread() {
  const { register, handleSubmit, onSubmit, errors } = usePostThread();

  return (
    <div className="NewThread">
      <div className="title">スレッド新規作成</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-thread">
        <input type="text" placeholder="スレッドタイトル" {...register('title', { required: true })} className="input-thread" />
        {errors.title && <div className='error-message'>※ タイトルを入力してください</div>}
        <div className='btn-new-thread'>
          <Link to="/" className='link-thread'>Topに戻る</Link>
          <input type="submit" value="作成" className='button-thread'/>
        </div>
      </form>
    </div>
  )
}