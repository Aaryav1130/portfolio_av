import { Nav, StatusBar } from './components/Chrome'
import { Hero } from './components/Hero'
import { Projects } from './components/Work'
import { Timeline } from './components/Timeline'
import { Metrics } from './components/Metrics'
import { Stack } from './components/Stack'
import { Connect } from './components/Connect'

export default function App() {
  return (
    <>
      <a className="skip" href="#me">Skip to content</a>
      <Nav />
      <StatusBar />
      <main className="page">
        <Hero />
        <Projects />
        <Timeline />
        <Metrics />
        <Stack />
        <Connect />
      </main>
    </>
  )
}
