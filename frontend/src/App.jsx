import { useState } from 'react'
import './App.css'

function App() {

  const [file, setFile] = useState(null)

  const [extractedText, setExtractedText] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [linkedIn, setLinked] = useState("")




  const handleUploadFile = (e) => {
    e.preventDefault()

    setName("")
    setEmail("")
    setLinked("")
    const formData = new FormData();

    formData.append("pdfFile", file);

    fetch("http://localhost:3000/extract-text", {
      method: "post",
      body: formData
    }).then(response => {
      return response.text();
    }).then(extractedText => {

      const texts = extractedText.trim()
      setExtractedText(texts)

      const textSplit = texts.split('\n')
      filterTexts(textSplit)

    });
  }

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  const filterTexts = (texts) => {
    setName(texts[0])

    const filterEmail = texts.find(i => i.includes('@'))
    setEmail(filterEmail)

    const filterLinkedIn = texts.find(i => i.includes("linkedin.com"))
    setLinked(filterLinkedIn.trim())


  }

  // console.log(extractedText)

  return (
    <form onSubmit={handleUploadFile}>
      <input type="file" id="inpFile" onChange={handleInputChange} />
      <button type="submit" id="btnUpload" disabled={!file}>Upload</button>
      <br />
      <br />
      {/* <textarea id="resultText" placeholder="Your PDF text will appear here..." defaultValue={extractedText} /> */}

      {name && <h2>{name}</h2>}
      {email && <h3>{email}</h3>}
      {linkedIn && <h4>{linkedIn}</h4>}

    </form>
  );
}

export default App
