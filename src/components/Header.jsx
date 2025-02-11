import Logo from '../../public/logo.jpg'
import Button from './Button'
export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={Logo} alt='logo' />
        <h1>Fomato</h1>
      </div>
      <nav >
        <Button textOnly>
          Cart (0)
        </Button>
      </nav>
    </header>
  )
}