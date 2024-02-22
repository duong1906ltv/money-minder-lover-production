import { Link } from 'react-router-dom'
import main from '../assets/images/main.jpg'
import Wrapper from '../assets/wrappers/LandingPage'
import Logo from '../components/Logo'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Money <span>Minder</span> Lover
          </h1>
          <p>
            Đây là một cái app cute phô mai dễ thương cho con nn béo báo quản lý
            tiền bạc
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
