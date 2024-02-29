import { createClient } from '@supabase/supabase-js'

export const supabase = createClient("https://xkwgrhwpuwriqbxvuvys.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd2dyaHdwdXdyaXFieHZ1dnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NjU5OTMsImV4cCI6MjAyNDU0MTk5M30.Y5quSer_kwqXyisIsl32ujrTj2XDaHOAtNhreRS-87Y")

export const signInWithGoogle = async () => {
    try {
        const { data ,error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if(error){
            throw error;
        }
        if(data){
            console.log("User signed in ", data)
            setTimeout(() => {
                console.log("time passed");
            }, 15000)
        }
    } catch (error) {
        console.log("Exception occured ", error)
    }
}

export const signOutWithGoogle = async ()=>{
    try {
        
        const { error } = await supabase.auth.signOut() 
    } catch (error) {
        console.log(error)
    }
}