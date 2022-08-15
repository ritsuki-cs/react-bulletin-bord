import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

type Inputs = {
  title: string
};

export function NewThread() {
  const instance = axios.create({
    baseURL: 'https://railway-react-bulletin-board.herokuapp.com',
  })
  const { register, handleSubmit} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    instance.post('/threads', {
      title: data.title
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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