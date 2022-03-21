import React ,{useState} from 'react';

export default function TextForm(props) {
    const [text,setText] = useState('Enter Text Here ');

    const handleUpClick = () =>{
        console.log("Upper case was clicked "+text);
        let newText = text.toUpperCase();
        setText(newText);
    }

    //event we get from onChange method
    const handleOnChange = (event) =>{
        console.log("On change");
        setText(event.target.value);//need to do because we are handling text from many where.
        //so it is neccesary to update on onChange in text field also. 
    }

  return (
    <>
    <div className="container" style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-2">
        <textarea className="form-control" value={text}
        style={{backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
        color: props.mode === 'dark' ? 'white' : 'black'}} onChange={handleOnChange} id="myBox" rows="7"></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleUpClick}>Convert To Upper Case</button>
    </div>
    <div className="container" style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
        <h3>Your Text Summary</h3>
        <p>{text.split(" ").length} Words and {text.length} characters</p>
    </div>
    </>
  )
}
