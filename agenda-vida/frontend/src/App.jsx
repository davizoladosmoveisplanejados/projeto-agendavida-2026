import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Rotas from './routes';
import Toast from './components/toast/toast';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="app-layout">
      <Toast />
      <main className="main-content">
        <Rotas />
      </main>
      <Footer />
    </div>
  )
}

export default App

