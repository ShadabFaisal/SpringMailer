import React, { use, useRef, useState } from 'react'
import SpringLogo from '../assets/SpringLogo.svg';
import SendButton from '../assets/send.png';
import toast from 'react-hot-toast';
import { sendEmail } from '../services/email.service';
import { Editor } from '@tinymce/tinymce-react';

function EmailSender() {

    const [emailData, setEmailData] = useState({
        to: "",
        subject: "",
        message: ""
    });

    const [sending, setSending] = useState(false);
    const editorRef = useRef(null);

    function handleFieldChange(event, name) {
        setEmailData({ ...emailData, [name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (emailData.to == "" || emailData.subject == "" || emailData.message == "") {
            return;
        }
        // console.log(emailData);

        //Send Email using API
        try {
            setSending(true);
            await sendEmail(emailData);
            toast.success("Email sent successfully!");
        }
        catch (error) {
            console.log(error);
            toast.error("Email not sent!");
        }
        finally {
            setSending(false);
        }
        setEmailData({
            to: '',
            subject: '',
            message: ''
        })
    }
    function handleReset() {
        setEmailData({
            to: '',
            subject: '',
            message: ''
        })
        editorRef.current.setConetent("");
    }
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-center my-10 '>
                <div className='email_card bg-white md:w-1/2 w-full p-4 rounded-lg shadow-xl '>
                    <h1 className='text-gray-900  font-medium tracking-wide text-2xl flex'>SpringMailer
                        <div className='m-1'></div><img src={SpringLogo} alt="Spring Logo" style={{ height: '30px' }} />
                    </h1>
                    <p className='text-green-800 font-semibold text-lg mt-1'>Delivering Emails faster than your morning coffee kicks in ☕📬!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input_field mt-4">
                            <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">To:</label>
                            <input
                                type="email"
                                id="email"
                                value={emailData.to}
                                onChange={(event) => handleFieldChange(event, 'to')}
                                className="block w-full p-4 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="abc@xyz.com" required />
                        </div>
                        <div className="input_field mt-4">
                            <label htmlFor="subject" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Subject: </label>
                            <input
                                type="text"
                                id="subject"
                                value={emailData.subject}
                                onChange={(event) => handleFieldChange(event, 'subject')}
                                className="block w-full p-4 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter subject here..." required />
                        </div>
                        <div className="input_field mt-4">
                            <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Body</label>
                            {/* <textarea
                                id="message"
                                rows="5"
                                value={emailData.message}
                                onChange={(event) => handleFieldChange(event, 'message')}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your email here...">
                                </textarea> */
                            }
                            <Editor
                                onEditorChange={(event)=>{
                                    setEmailData({...emailData, 'message':editorRef.current.getContent()})
                                }}
                                apiKey='o77wyrpvjw389ksqti3zao77qxa94m1b6pis6rr7znry8m3o'
                                onInit={(_evt, editor) => editorRef.current = editor}
                                initialValue="<p>Write your email here...</p>"
                                value={emailData.message}
                                init={{
                                    height: 500,
                                    menubar: 'file edit view insert format tools table help',
                                    plugins: [
                                        // Core editing features
                                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                        'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                                      ],
                                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                  }}
                            />


                        </div>
                        {sending && <div className="loader flex justify-center items-center mt-4">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className='mx-3'>Sending Email...</p>
                        </div>}
                        <div className="button_container mt-4 flex justify-center gap-3">
                            <button disabled={sending} type='submit' className='block rounded flex px-9 py-4 rounded text-lg bg-blue-700 shadow-lg shadow-blue-500/50 ... text-white hover:bg-blue-900'>Send <img className="ml-2" src={SendButton} alt="Send Button" style={{ height: '20px' }} /></button>
                            <button type='reset' onClick={handleReset} className='block rounded flex px-9 py-4 rounded text-lg bg-red-800 text-white hover:bg-red-700'>Clear </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EmailSender