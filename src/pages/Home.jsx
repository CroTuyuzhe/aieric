import Hero from '../components/Hero'
import Works from '../components/Works'
import About from '../components/About'
import BlogPreview from '../components/BlogPreview'
import Footer from '../components/Footer'

export default function Home({ heroMode, onActivate }) {
  return (
    <>
      <Hero heroMode={heroMode} onActivate={onActivate} />
      <Works />
      <About />
      <BlogPreview />
      <Footer />
    </>
  )
}
