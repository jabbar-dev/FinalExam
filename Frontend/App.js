
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
    const [bookmarks,setBookmarks]=useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/getbookmarks").then(
          res => {return setBookmarks(res.data.bookmarks)
          }
        )
  
    }, [])

    const searchBookmarks =(event) =>{
        setValue(event.target.value)
        if(event.target.value){
          axios.get("http://localhost:4000/getbookmark/"+event.target.value)
          .then(
            res => {return setBookmarks(res.data.bookmarks)}
          )
        }
        else{
          axios.get("http://localhost:4000/getbookmarks").then(
            res => {return setBookmarks(res.data.bookmarks)
            }
          )  
        }
    }



  const handleAddBookmark = async () =>{

    setAddModelOpen(false)
    setName("")
    setURL("")
    await axios.post("http://localhost:4000/addbookmark",
    {     
        name:name,
        url:URL
    }
    )
    await axios.get("http://localhost:4000/getbookmarks").then(
      res => {return setBookmarks(res.data.bookmarks)
      }
    )

  }

  //Delete Bookmark
  const deleteBookmark = async (id) =>{
    await axios.post(`http://localhost:4000/deletebookmark/${id}`)
    await axios.get("http://localhost:4000/getbookmarks").then(
      res => {return setBookmarks(res.data.bookmarks)
      }
    )
  }

return (
    <div className="App">
        <div className="Navbar" style={{minWidth:"1000px",display:"flex",justifyContent:"space-between"}}>
          <h2 style={{margin:"15px"}}> Favourites</h2>
        <div style={{margin:"15px",minWidth:"500px"}}>
        <Input type="text" name="search" value={value} onChange={searchBookmarks}/>
        </div>
        <div style={{margin:"15px"}}>
          <Button type="primary" onClick={() => setAddModelOpen(true)}>+</Button>      
        </div>
        </div>


      <>
  {/* ADD */}

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
 {/* Edit */}

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
  
    <div>
      <ul style={{border:"1px solid gray",borderRadius:"10px",margin:"20px"}}>
        {
          bookmarks.length > 0 ? bookmarks.map(itm=> 
            { return <div key={itm._id} style={{padding:"15px",display:"flex",justifyContent:'space-between'}}> 
               <div>
                <span style={{fontSize:"22px",margin:"8px",paddingRight:"20px" }}> {(itm.name+"").charAt(0)}</span> {itm.url}
               </div>
              <div >
                <Button type="primary" onClick={()=>updateBookmark(itm._id)}> Edit</Button>
                <Button type='primary' danger onClick={()=>deleteBookmark(itm._id)}> Delete</Button>
              </div>
            </div>}
            ) : ""
        }
      </ul>
      
    </div>

    <Divider orientation="left"></Divider>
    
    </>


    </div>
  );
    }