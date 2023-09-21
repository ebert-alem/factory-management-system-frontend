import './navbar.scss'

export const Navbar = () => {

  return (
    <div className='navbar'>
      <div className='logo'>
        <a href="/"><img src="/logo.png" alt="logo" /></a>
        {/* <span>Brava Stoks</span> */}
      </div>
      <div className='icons'>
        <img src="/search.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" className='icon'/>
          <span>1</span>
        </div>
        <div className="user">
          <img src="/noavatar.png"
            alt="" />
          <span>Admin</span>
        </div>
        {/* <img src="settings.svg" alt="" className="icon" /> */}
      </div>
    </div>

  )
}
