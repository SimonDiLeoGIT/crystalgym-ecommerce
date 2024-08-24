const Register = () => {
  return (
    <>
      <form 
        action="http://localhost:5000/api/users/register"
        method="POST"
        target="resultIframe"
        className="flex flex-col gap-2"
      >
        <input name='username' type="text" placeholder="Name" />
        <input name='email' type="email" placeholder="Email" />
        <input name='password' type="password" placeholder="Password" />
        {/* <input type="password" placeholder="Confirm Password" /> */}
        <button type="submit">Register</button>
      </form>
      <iframe name="resultIframe" className="hidden"></iframe>
    </>
  )
}

export default Register