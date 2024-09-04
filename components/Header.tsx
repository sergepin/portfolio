import Link from "next/link"
import { Button } from "./ui/button"
import Nav from "./Nav"

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
            { /* Logo */ }
                <h1 className="text-4xl font-semibold">
                    Sergio <span className="text-accent">.</span>
                </h1>
            </Link>
            {/* desktop nav */}
            <div className="hidden xl:flex items-center gap-8">
              <Nav/>
              <Link href="/contact">
                <Button className="outline">Hire Me</Button>
              </Link>
            </div>

            {/* mobile nav */}
            <div className="xl:hidden">Mobile nav</div>
        </div>
    </header>
  )
}

export default Header