import { Link } from 'react-router-dom'
import { menuAdmin, menuUser } from '../../data'
import './menu.scss'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'


export const Menu = () => {

  const switchMenu = () => {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.Charge === "admin" ? menuAdmin : menuUser
  }


  return (
    <div className='menu'>
      {switchMenu().map(item => (
        <div className='item' key={item.id}>
          <span className='title'>{item.title}</span>
          {item.listItems.map(listItem => (
            <Link to={listItem.url} className='listItem' key={listItem.title}>
              <img src={listItem.icon} className="icon" alt="" />
              <span className='listItemTitle'>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
