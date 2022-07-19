import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import { Button, Divider, Input,List,Modal, Typography } from 'antd';
import axios from "axios"


function App() {
  const [value, setValue] = useState("")
  const [addModelOpen,setAddModelOpen]=useState(false)
  const [edit,setEdit]=useState(false)
  const [name, setName] = useState("")
  const [URL, setURL] = useState("")
  const [count, setCount] = useState(0)

  const [bookmarks,setBookmarks]=useState([])

  useEffect(() => {
      axios.get("http://localhost:3600/getbookmarks").then(
        res => {return setBookmarks(res.data.bookmarks)
        }
      )

  }, [])
  
  const searchBookmarks =(event) =>{
      setValue(event.target.value)
      if(event.target.value){
        axios.get("http://localhost:3600/getbookmark/"+event.target.value)
        .then(
          res => {return setBookmarks(res.data.bookmarks)}
        )
      }
      else{
        axios.get("http://localhost:3600/getbookmarks").then(
          res => {return setBookmarks(res.data.bookmarks)
          }
        )  
      }
  }

  const handleAddBookmark = async () =>{

    setAddModelOpen(false)
    setName("")
    setURL("")
    await axios.post("http://localhost:3600/addbookmark",
    {     
        name:name,
        url:URL
    }
    )
    await axios.get("http://localhost:3600/getbookmarks").then(
      res => {return setBookmarks(res.data.bookmarks)
      }
    )

  }

  const deleteBookmark = async (id) =>{
    await axios.post(`http://localhost:3600/deletebookmark/${id}`)
    await axios.get("http://localhost:3600/getbookmarks").then(
      res => {return setBookmarks(res.data.bookmarks)
      }
    )
  }

  const updateBookmark = async (id) =>{
    setAddModelOpen(true)

  }

  return (
    <div className="App">
        <div className="Navbar" style={{minWidth:"1000px",display:"flex"}}>
          <div style={{margin:"15px"}}> ADD <br/>
          <Button type="primary" onClick={() => setAddModelOpen(true)}>+</Button>      
        </div>
        <br/>
        <div style={{margin:"15px",minWidth:"500px"}}>
          SEARCH
        <Input type="text" name="search" value={value} onChange={searchBookmarks}/>
        </div>
       
        </div>


      <>
        <Modal
          title="Add Bookmark"
          style={{ top: 20 }}
          visible={addModelOpen}
          onOk={() => handleAddBookmark()}
          onCancel={() => setAddModelOpen(false)}
        >
          <label>Name </label>
          <Input placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value) }/> 
          
          <label>URL </label>
          <Input placeholder='Enter URl' value={URL} onChange={(e)=> setURL(e.target.value) }/> 

        </Modal>

      </>
      <>
        <Modal
          title="Edit Bookmark"
          style={{ top: 20 }}
          visible={edit}
          onOk={() => setEdit(false)}
          onCancel={() => setEdit(false)}
        >
          <label>Name </label>
          <Input placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value) }/> 
          
          <label>URL </label>
          <Input placeholder='Enter URl' value={URL} onChange={(e)=> setURL(e.target.value) }/> 

        </Modal>

      </>

    <>
    <Divider orientation="left"></Divider>
    <div><h1>YOUR FAVOURITE</h1></div>

    <div>
      <ul style={{borderRadius:"10px",margin:"20px"}}>
        {
         
          bookmarks.length > 0 ? bookmarks.map(itm=> 

            { return <div className='row' key={itm._id} style={{padding:"15px", margin: 0, display:"inline-block"}}> 
               <div style={{background:"yellow", borderRadius:"10px"}}>
                <span style={{fontSize:"35px",margin:"8px",paddingRight:"20px" }}> <a href = {"http://"+itm.url}>{(itm.name+"").charAt(0)}</a></span> 
               </div>
               
              <div>
                <Button type="btn btn-primary" onClick={()=>updateBookmark(itm._id)}> ...</Button>
                <br/>
                <Button type='primary' danger onClick={()=>deleteBookmark(itm._id)}> X</Button>
              </div>
            </div>}


            

            ) : ""
        }
      </ul>
      
    </div>

    <Divider orientation="left"></Divider>


    {/* MOST FREQUENT */}
    <Divider orientation="left"></Divider>
    <div><h1>MOST FREQUENT VISITED</h1></div>

    <div>
      <ul style={{borderRadius:"10px",margin:"20px"}}>
        {
         
          bookmarks.length > 0 ? bookmarks.map(itm=> 
            //show only 5 items 

               
                
            { 
              if(count<5){
              return <div className='row' key={itm._id} style={{padding:"15px", margin: 0, display:"inline-block"}}> 
               <div style={{background:"yellow", borderRadius:"10px"}}>
                <span style={{fontSize:"35px",margin:"8px",paddingRight:"20px" }}> <a href = {"http://"+itm.url}>{(itm.name+"").charAt(0)}</a></span> 
               </div>
               
              <div>
                <Button type="btn btn-primary" onClick={()=>updateBookmark(itm._id)}> ...</Button>
                <br/>
                <Button type='primary' danger onClick={()=>deleteBookmark(itm._id)}> X</Button>
                
              </div>
            </div>}
            setCount(count+2)
            }


            

            ) : ""
        }
      </ul>
      
    </div>

    <Divider orientation="left"></Divider>
    
    </>


    </div>
  );
}

export default App;
