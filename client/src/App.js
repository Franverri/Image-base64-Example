import React, {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);

  const loadImages = () => {
    axios.get('http://localhost:3200/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.log("No files uploaded!");
      })
  }

  const onFormChange = (e) => {
    let file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        setImage({
          name: file.name,
          data: btoa(binaryString)
        });
      }
      reader.readAsBinaryString(file);
    }
  }

  const onFileSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3200/image', {image})
      .then(res => {
        alert(res.data);
        setImage("");
        document.getElementById("file").value = '';
      })
      .catch(err => {
        alert('There was a problem with the request, please try again later');
        setImage("");
        document.getElementById("file").value = '';
      })
  }

  return (
    <div>
      <h1>Henry - Image base64 Example</h1>
      <hr />
      <h3>Imagenes cargadas en el servidor:</h3>
      <div id="imgServer">
      {
        images.length > 0 && images.map(img =>
          <img src={"data:image/png;base64," + img} alt="No images"/>
        )
      }
      </div>
      <button onClick={loadImages}>Cargar imagenes</button>
      <hr />
      <form onSubmit={onFileSubmit} onChange={onFormChange}>
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
        />
        <input type="submit" value="Upload!" />
      </form>
      <img id="preview" src={image ? "data:image/png;base64," + image.data : ""} alt="Nothing selected"/>
    </div>
  );
}

export default App;
