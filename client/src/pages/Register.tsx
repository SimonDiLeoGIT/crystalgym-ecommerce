import { useEffect, useState } from "react"
import logo from '/CrystalGymLogo.png'
import '../styles/register.css'
import UserService from "../services/user.service"
import { UserRegisterInterface } from "../interfaces/UserInterface"
import { Link } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { isUserResponseInterface } from "../utils/ResponseType"

const Register = () => {

  useEffect(() => {
    document.title = "Sign Up | CrystalGym";
  })

  const { initializeUser } = useUser()
  
  const [errorMessage, setErrorMessage] = useState<string>("")

  async function signUp(event: React.FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data: UserRegisterInterface = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await UserService.register(data)
      
      if (response.code === 409) {
        console.log("error");
        setErrorMessage(response.message);
      } else if (response.code === 201) {
        if (isUserResponseInterface(response)) {
          initializeUser(response.data.user);
          window.location.href = "/profile";
        }
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <section className="fixed top-0 left-0 w-screen h-screen -bg--color-white z-50 flex overflow-hidden">
      <form 
        onSubmit={signUp}
        method="POST"
        className="register flex flex-col gap-4 border -border--color-very-light-grey rounded-lg w-10/12 max-w-lg m-auto shadow-lg -shadow--color-very-light-grey p-4 pb-10 "
      >
        <figure className="m-auto">
          <image>
            <Link to="/" className=""><img src={logo} alt="Crystal Gym Logo" width={60}/></Link>
          </image>
          <figcaption>
            <span className="hidden">Crystal Gym Logo</span>
          </figcaption>
        </figure>
        <legend className="font-semibold m-auto -text--color-black">Sign Up</legend>
        <span className="-text--color-red font-semibold">{errorMessage}</span>
        <input 
          name='username' 
          type="text" 
          placeholder="Username" 
          required 
          minLength={3} 
          maxLength={30} 
          pattern="[A-Za-z0-9]+"
          title="Must contain only letters and numbers."
        />
        <input name='email' type="email" placeholder="Email" required/>
        <input 
          name='password' 
          type="password" 
          placeholder="Password" 
          required 
          minLength={8} 
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be at least 8 characters long, including at least one number, one uppercase letter, and one lowercase letter."
        />
        <p className="text-center text-sm -text--color-black opacity-90">You already have an account? <Link to="/login" className="-text--color-dark-grey-violet border-b hover:opacity-60">Login</Link></p>
        <button 
          type="submit"
          className="w-9/12 m-auto p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150"
        >
          Register
        </button>
      </form>
    </section>
  )
}

export default Register