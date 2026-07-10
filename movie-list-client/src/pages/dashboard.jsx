function Dashboard(){
    return (
        <nav style={{
            backgroundColor : "black",
        }}>
            <a href="#movie">Movie |</a>
            <a href="#watchlist">To Watch List |</a>
            <a href="#logout" onClick={handleLogOut}> Log out</a>
        </nav>
    )
    
}
function handleLogOut(){
    fetch('/api/auth/signOut', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/Login';
        }
    })
    .catch(error => console.error('Sign out error:', error));
}


export default Dashboard;