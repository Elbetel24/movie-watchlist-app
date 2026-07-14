import './Auth.css'


function Dashboard(){
    return (
        <div className="Dashboard">
            <nav className="Navbar">
                <div className="auth-sprockets top">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
        </div>
        <h1 className="auth-title">Reels List</h1>
        <li>
            <button type="button" className="nav-button">Watched Movies  |</button>
            <button type="button" className="nav-button">  To Watch  |</button>
            <button type="button" className="nav-button" onClick={handleLogOut}> Log out </button>
        </li>
        <input type="search" placeholder="Enter a movie name"></input>
        </nav>
        </div>
    )



    
}
function handleLogOut(){
    fetch('/api/auth/signOut', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/';
        }
        
    })
    .catch(error => console.error('Sign out error:', error));
}


export default Dashboard;