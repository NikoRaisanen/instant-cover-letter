import react, { useState } from 'react';

const PromptField = (props: any) => {
    const [promptLength, setPromptLength] = useState(0);
    const maxPromptLength = 1000;

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        props.setPrompt(e.target.value);
        setPromptLength(e.target.value.length);
        if (!props.isButtonDisabled && e.target.value.length > maxPromptLength) {
          alert(`Your summary is too long. Please shorten it to ${maxPromptLength} characters or less`);
          props.setIsButtonDisabled(true);
        }
        // re enable button if length is appropriate
        else if (props.isButtonDisabled && e.target.value.length <= maxPromptLength) {
          props.setIsButtonDisabled(false);
        }
      }
    return (
        <>
        <p className="titles">
        Write a few sentences about your skills, experience, and what you're looking for
        </p>
        <br/>
        <label className="prompt-label">Characters remaining: {(maxPromptLength - promptLength) < 0 ? 0 : (maxPromptLength - promptLength)}</label>
        <br/>
        <textarea placeholder="If you want to include any specific experience, skills or projects in your cover letter you should write about it here. Providing more detail usually leads to better results" className="prompt" onChange={(e) => {handlePromptChange(e)}}/>
        <br/>
        </>
    );
}

export default PromptField;