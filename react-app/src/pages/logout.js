const logout = () =>{
    localStorage.removeItem('token')
    window.location.href = '/login';
    return (<></>)
}

export default logout