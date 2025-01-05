export default function ProfilePage({params}: any) {
  return (
    <div className='items-center justify-center text-center'>
      <h1>Profile Page</h1>
      <p className='bg-slate-400 text-white'>{params.id}</p>
    </div>
  )
}
