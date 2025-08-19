
import Link from "next/link";
const Home=()=>{
  return(
    <div className="flex min-h-screen items-center justify-center text-4xl ">
      <p>Home</p>
      Click <Link href='/documents/123' className="text-blue">here</Link>to go to document id
    </div>
  )
}

export default Home;