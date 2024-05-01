import { createClient } from '@supabase/supabase-js'



export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY)

//Dont use these methods to sign in for now!
export const signInWithGoogle = async () => {

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/dashboard'
            },
        });
        if (error) {
            throw error;
        }
        if (data) {
            console.log("User signed in ", data)
        }
    } catch (error) {
        console.log("Exception occured ", error)
    }
}

export const signOutWithGoogle = async () => {
    try {
        const { error } = await supabase.auth.signOut()
    } catch (error) {
        console.log(error)
    }
}