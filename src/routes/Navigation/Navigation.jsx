import { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Navigation.css';


const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const userStored = localStorage.getItem('currentUser')
    console.log({userStored})
    if (userStored) {
      setCurrentUser(JSON.parse(userStored))
    }
  }, [])

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <div className='navigation'>
        {/* <Link className='logo-container' to='/'>
          <img src={} alt='Logo' className='logo' />
        </Link> */}
        <div className='nav-links-container'>
                {currentUser ? (
                    <span className='nav-link' onClick={handleSignOut}>
                    Cerrar Sesión
                    </span>
                ) : (
                    <Link className='nav-link sign-in' to='/login'>
                    Iniciar Sesión
                    </Link>
                )}
        </div>

            <div className='nav-links-container'>
                {currentUser ? (
                    <span className='nav-link' onClick={handleSignOut}>
                    Cerrar Sesión
                    </span>
                ) : (
                    <Link className='nav-link sign-in' to='/login'>
                    Registrarte
                    </Link>
                    )} 

            </div>
          
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;