import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div style={{backgroundColor : "#dfe6e9" , height:"100vh" , boxSizing:"border-box" , margin:0 , padding:0}}>
      <div style={{display:"flex" , justifyContent:"center"}}>
        <div>
          <div>
          <PostComponant/>
          <br />
          </div>

          <div>
          <PostComponant/>
          <br />
          </div>

          <div>
          <PostComponant/>
          <br />
          </div>
        </div>
      </div>
     </div>
  )
}

function PostComponant(){
const style = {width: 200 , backgroundColor : "white" , borderRadius: 10 , borderColor: "gray" , borderWidth: 1 , padding: 20};
  return <div style={style}>
  <div style={{display:"flex" ,  gap: "13px"}}>
    <img src={"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid"} style={{
      width:40,
      height:40,
      borderRadius: 20
    }} />
    <div tyle={{fontSize : 10}}>
      <b>100xdevs</b>
      <div>23,888 followers</div>
      { <div style={{display:"flex"}}>
      <div>12m ago.</div>
      <div>
      <img src={"https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-clock-icon-png-image_865317.jpg"} style={{width:"13px" , height:"15px"}} />
      </div>
      </div>}
    </div>
  </div>

    <div style={{fontSize : 12}}>
      want to know how to win big ?? check out how these folks won $6000 in bounties...
    </div>
  </div>
}

export default App
