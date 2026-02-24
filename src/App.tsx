
import './App.css'
import KendoExpandableGrid from './component/KendoExpandableGrid'
import { ExpandCollapseProvider } from './hooks/useKendoContext'

function App() {

  return (
    <>
      <div className='p-3'>
        <ExpandCollapseProvider>
          <KendoExpandableGrid />
        </ExpandCollapseProvider>
      </div >

    </>
  )
}

export default App
