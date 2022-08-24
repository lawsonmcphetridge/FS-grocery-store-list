const SUPABASE_URL = 'https://qccwdgqhkuvusyzbcido.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjY3dkZ3Foa3V2dXN5emJjaWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA2MDcwNjcsImV4cCI6MTk3NjE4MzA2N30.DFfLtHUtrylbCXtdC__wIA1RZKo0p5Rk9ie6QztGjBM';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }
    return user;
}




export function redirectIfLoggedIn() {
    const user = getUser();
    if (user) {
        location.replace('./grocery-list');
    }
}



export async function getAllGroceries() {
    const response = await client.from('grocery').select('*').order('id');
    return checkError(response);
}


export async function createList(grocery) {
    const response = await client.from('grocery').insert(grocery).single();
    return checkError(response);
}


export async function updateGrocery(id) {
    const response = await client.from('grocery').update({ complete: true }).match({ id: id });
    return checkError(response);
}

export async function deleteAllGroceries(id) {
    const response = await client.from('grocery').delete('*').match({ user_id: id });
    return checkError(response);
}




export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}



function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

/* Data functions */
