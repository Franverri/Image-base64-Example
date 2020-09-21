import React, {useState} from 'react';

const App = () => {
  const [image, setImage] = useState('');

  const onFormChange = (e) => {
    let file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        setImage(btoa(binaryString));
        const preview = document.getElementById('preview');
        preview.src = "data:image/png;base64," + btoa(binaryString);
      }
      reader.readAsBinaryString(file);
    }
  }

  const onFileSubmit = (e) => {
    e.preventDefault();
    //TO-DO: API call to save image un database
  }

  return (
    <div>
      <h1>Henry - Image base64 Example</h1>
      <form onSubmit={onFileSubmit} onChange={onFormChange}>
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
        />
        <input type="submit" value="Upload!" />
      </form>
      <img id="preview" alt="Nothing selected"/>
    </div>
  );
}

export default App;
