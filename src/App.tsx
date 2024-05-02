import { useState } from "react";

const CodewordsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    action_id: '',
  });
  const [submitMessage, setSubmitMessage] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/get-codewords', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      if (!response.ok) {throw new Error('Failed to submit action_id')}

      const jsonData = await response.json();
      setSubmitMessage('Codewords returned: ' + JSON.stringify(jsonData.result));
      console.log('Submission successful');
    } catch (error) {
      console.error('Error with submission:', error);
    }
  };

  return (
    <div>
      <h1>Query codewords</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
          action_id:
          </label>
          <input type="text" value={formData.action_id} onChange={handleChange}/>
        </div>
        <button>Submit</button>
      </form>
      {submitMessage && <div>{submitMessage}</div>}
    </div>
  );
};

export default CodewordsForm;
