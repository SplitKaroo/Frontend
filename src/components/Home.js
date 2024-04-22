import { signInWithGoogle, signOutWithGoogle } from '../supabase/utils/supabase.utils'


export default function Home() {
  return (
    <div>
      {/* {currentUser ? "someone is signed in" : "noone is signed in"} */}
      <button onClick={signInWithGoogle}>
        Sign in
      </button>
      <button onClick={signOutWithGoogle}>
        Sign out
      </button>
    </div>
  )
}
